/**
 * src/assets/svg/Stacks/ 配下のSVGファイルをバンドル時にインポート
 */
const SVG_RAW_MODULES = import.meta.glob<string>(
  '../assets/svg/Stacks/*.svg',
  {
    query: '?raw',
    import: 'default',
    eager: true,
  }
);

/**
 * SVG検索用のキャッシュ辞書
 * 初期化時に一度だけ生成し、O(1) で解決
 */
const SVG_LOOKUP_MAP = new Map<string, string>();
const SVG_NORMALIZED_ENTRIES: Array<{ cleanName: string; rawText: string }> = [];

for (const [path, rawText] of Object.entries(SVG_RAW_MODULES)) {
  const filename = path.split('/').pop()?.toLowerCase() || '';
  const withoutExt = filename.replace(/\.svg$/, '');
  const cleanName = withoutExt.replace(/[^a-z0-9]/g, '');

  SVG_LOOKUP_MAP.set(path.toLowerCase(), rawText);
  SVG_LOOKUP_MAP.set(filename, rawText);
  SVG_LOOKUP_MAP.set(withoutExt, rawText);
  SVG_LOOKUP_MAP.set(cleanName, rawText);

  // 'icon' や 'logo' を除いたエイリアスも登録 (例: 'typescripticon' -> 'typescript')
  const stripped = cleanName.replace(/icon|logo/g, '');
  if (stripped && !SVG_LOOKUP_MAP.has(stripped)) {
    SVG_LOOKUP_MAP.set(stripped, rawText);
  }

  SVG_NORMALIZED_ENTRIES.push({ cleanName, rawText });
}

/**
 * 渡されたパスやファイル名から対象のSVGテキスト
 */
export const resolveSvgText = (input?: string): string | null => {
  if (!input) return null;
  const target = input.trim().toLowerCase();

  // 完全一致・ファイル名・拡張子なし・正規化名での検索
  const direct = SVG_LOOKUP_MAP.get(target);
  if (direct) return direct;

  const cleanTarget = target.replace(/[^a-z0-9]/g, '');
  const cleanMatch = SVG_LOOKUP_MAP.get(cleanTarget);
  if (cleanMatch) return cleanMatch;

  // 部分一致フォールバック
  for (const entry of SVG_NORMALIZED_ENTRIES) {
    if (
      entry.cleanName.includes(cleanTarget) ||
      cleanTarget.includes(entry.cleanName.replace(/icon|logo/g, ''))
    ) {
      return entry.rawText;
    }
  }

  return null;
};

/**
 * 16進数カラーコードや基本色名をサイトの基本3色＋透過パレットへ変換する純粋関数
 * - メイン: 文字色（石墨インク #36332f）
 * - サブ: 文字色系統の褪色セピア（#7a6c5d）
 * - アクセント: 刻印朱肉（#dc3f24）
 * - 透過: 用紙色 / 透過（#fffdf4 / transparent）
 */
export const mapColorToPalette = (hexOrName: string): string => {
  const val = hexOrName.trim().toLowerCase();
  if (['none', 'transparent', 'currentcolor', 'inherit'].includes(val)) {
    return 'transparent';
  }
  if (['white', '#fff', '#ffffff', '#ebebeb', '#fafafa'].includes(val)) {
    return 'var(--stack-transparent, #fffdf4)';
  }
  if (['black', '#000', '#000000', '#1d1d1b'].includes(val)) {
    return 'var(--stack-main, #36332f)';
  }
  if (val === 'gray') {
    return 'var(--stack-sub, #7a6c5d)';
  }
  if (!val.startsWith('#')) {
    return hexOrName;
  }

  let h = val.slice(1);
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  if (h.length !== 6) {
    return hexOrName;
  }

  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min || 1) : d / (max + min || 1);

  let hue = 0;
  if (d !== 0) {
    if (max === r) {
      hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      hue = ((b - r) / d + 2) * 60;
    } else {
      hue = ((r - g) / d + 4) * 60;
    }
  }

  // 透過・用紙色
  if (l >= 0.88) {
    return 'var(--stack-transparent, #fffdf4)';
  }

  // アクセント
  if ((hue >= 320 || hue <= 35) && s >= 0.35) {
    return 'var(--stack-accent, #dc3f24)';
  }

  // サブ
  if (l >= 0.55) {
    return 'var(--stack-sub, #7a6c5d)';
  }

  // メイン
  return 'var(--stack-main, #36332f)';
};

export type RecolorOptions = {
  bleed?: boolean;
  stain?: boolean;
  filterId?: string;
  stainFilterId?: string;
  maskId?: string;
  className?: string;
};

/**
 * 外部SVGテキスト内の色指定を解析し、手記パレットへ自動上塗り置換
 * bleed / stain が有効な場合は、StampGraphicと同様のノイズ・ステインフィルターを注入する
 */
export const recolorSvg = (rawSvg: string, options?: RecolorOptions): string => {
  const bleed = options?.bleed ?? true;
  const stain = options?.stain ?? true;
  const className = options?.className;

  // <svg> より前の XML宣言、DOCTYPE、コメント、先頭空白を除去
  const svgStartIndex = rawSvg.search(/<svg\b/i);
  const cleaned = svgStartIndex >= 0 ? rawSvg.slice(svgStartIndex) : rawSvg;

  //  #xxxxxx 形式のカラーコードを置換
  let replaced = cleaned.replace(
    /#([0-9a-fA-F]{3,6})\b/g,
    (match) => mapColorToPalette(match)
  );

  //  fill="xxx" や stroke="xxx" などの名前色を置換
  replaced = replaced.replace(
    /(fill|stroke)=(["'])gray(["'])/gi,
    '$1=$2var(--stack-sub, #7a6c5d)$3'
  );

  // <svg> タグの固定幅・高さを除去し、追従
  // bleed / stain が有効な場合は、viewBoxに応じたフィルターとマスクを生成して内包する
  replaced = replaced.replace(
    /<svg\b([^>]*)>/i,
    (_match, attrs: string) => {
      const cleanAttrs = attrs
        .replace(/\s+(width|height)=["'][^"']*["']/gi, '')
        .replace(/\s+class=["'][^"']*["']/gi, '')
        .replace(/\s+[xy]=["'][^"']*["']/gi, '')
        .replace(/\s+style=["'][^"']*["']/gi, '')
        .replace(/\s+preserveAspectRatio=["'][^"']*["']/gi, '');

      const classAttr = className ? ` class="${className}"` : '';
      const aspectAttr = ' preserveAspectRatio="xMidYMid meet"';

      if (!bleed && !stain) {
        return `<svg ${cleanAttrs}${classAttr}${aspectAttr} aria-hidden="true">`;
      }

      // viewBoxから座標系サイズを抽出
      const vbMatch = attrs.match(
        /viewBox=["']\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*["']/i
      );
      const vbX = vbMatch ? parseFloat(vbMatch[1]) : 0;
      const vbY = vbMatch ? parseFloat(vbMatch[2]) : 0;
      const vbW = vbMatch ? parseFloat(vbMatch[3]) : 48;
      const vbH = vbMatch ? parseFloat(vbMatch[4]) : 48;

      const scale = Math.min(vbW * 0.005, 1.0).toFixed(2);
      const noiseFreq = (5.0 / vbW).toFixed(4);
      const blobFreq = (4.3 / vbW).toFixed(4);
      const grainFreq = (100.0 / vbW).toFixed(4);

      const filterId = options?.filterId || 'stack-icon-bleed';
      const stainFilterId = options?.stainFilterId || 'stack-icon-stain';
      const maskId = options?.maskId || 'stack-icon-mask';

      const defs = `
        <defs>
          ${
            bleed
              ? `<filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="${noiseFreq}" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="${scale}" xChannelSelector="R" yChannelSelector="G" />
          </filter>`
              : ''
          }
          ${
            stain
              ? `<filter id="${stainFilterId}" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="${blobFreq}" numOctaves="3" result="blobs" />
            <feTurbulence type="fractalNoise" baseFrequency="${grainFreq}" numOctaves="2" result="grain" />
            <feComposite in="blobs" in2="grain" operator="arithmetic" k1="0" k2="0.75" k3="0.25" k4="0" result="mixed" />
            <feColorMatrix type="saturate" values="0" in="mixed" result="gray" />
            <feComponentTransfer in="gray">
              <feFuncR type="linear" slope="0.6" intercept="0.82" />
              <feFuncG type="linear" slope="0.5" intercept="0.82" />
              <feFuncB type="linear" slope="0.5" intercept="0.82" />
            </feComponentTransfer>
          </filter>
          <mask id="${maskId}" mask-type="alpha" maskUnits="userSpaceOnUse" x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}">
            <rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="#ffffff" filter="url(#${stainFilterId})" />
          </mask>`
              : ''
          }
        </defs>`;

      const filterAttr = bleed ? ` filter="url(#${filterId})"` : '';
      const maskAttr = stain ? ` mask="url(#${maskId})"` : '';

      return `<svg ${cleanAttrs}${classAttr}${aspectAttr} aria-hidden="true">${defs}<g${filterAttr}${maskAttr}>`;
    }
  );

  if (bleed || stain) {
    replaced = replaced.replace(/<\/svg>/i, '</g></svg>');
  }

  return replaced;
};
