import type { StackData } from "../types/stacks";

export const stackFramPlatsList: StackData[] = [
    {
        id: "appdev",
        icon:null,
        name: "App Development",
        description: (
            <p className="p-stacks__text">
                WPFやJavaを用いたGUIを持つアプリケーションが開発できます．<br />Reactを勉強中です。
            </p>
        ),
    },
    {
        id: "gamedev",
        name: "Game Development",
        description: (
            <p className="p-stacks__text">
                C++とSDLライブラリを組み合わせたゲームエンジンに頼らない2Dゲームの開発が可能です．<br />現在，サークル内でUnityでのチーム開発を行っています．
            </p>
        ),
    },
    {
        id: "databasemgmt",
        icon:null,
        name: "Database Management",
        description: (
            <p className="p-stacks__text">
                MySQLやSQLiteをアプリケーションに組み込み，データ管理が可能です．
            </p>
        ),
    },
    {
        id: "hardwarectrl",
        icon:null,
        name: "Hardware Control",
        description: (
            <p className="p-stacks__text">
                C言語を用いたマイコン制御によりソフトウェアと物理デバイスを組み合わせた開発が可能です．
            </p>
        ),
    },
];