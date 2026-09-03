import type { StackData } from "../types/stacks";

export const stackFramPlatsList: StackData[] = [
    {
        id: "appdev",
        icon:null,
        name: "App Development",
        description: (
            <p className="p-stacks__text">
                WPFや Java を用い、GUIを持つアプリケーションを開発できます。ユーザーの操作性と内部ロジックの両立を重視しています。<br />最近はReactを勉強中です。
            </p>
        ),
    },
    {
        id: "gamedev",
        name: "Game Development",
        description: (
            <p className="p-stacks__text">
                C++ と SDL ライブラリを組み合わせた 2D ゲームのスクラッチ開発が可能です。エンジンに頼らない2Dゲームの開発が可能です。
            </p>
        ),
    },
    {
        id: "databasemgmt",
        icon:null,
        name: "Database Management",
        description: (
            <p className="p-stacks__text">
                MySQL や SQLite をアプリケーションに組み込み、データ管理が可能です。
            </p>
        ),
    },
    {
        id: "hardwarectrl",
        icon:null,
        name: "Hardware Control",
        description: (
            <p className="p-stacks__text">
                C言語を用いたマイコン制御により、ソフトウェアと物理デバイスを繋ぐ開発が可能です。ハードウェアの制約を考慮した最適化に関心があります。
            </p>
        ),
    },
];