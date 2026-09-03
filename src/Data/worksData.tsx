import type { WorkData } from "../types/work";

export const worksList:WorkData[] =[
    {
        id:"portfolio",
        title:"Portfolio",
        description:<p>webの基礎を学ぶため制作中！</p>,
        imgSrc:"./img/myportfolio.png",
        footerText:"HTML/CSS/JS",
    },
    {
        id: "kadaikenkyu",
        title: "課題研究",
        description: (
            <p>
                高校3年次の課題研究にて作成。<br />
                衝突判定であるAABBとOBBを実際に実装しベンチマークを行い比較する。
            </p>
        ),
        imgSrc: "./img/kadaikenkyu.png",
        footerText: "C++/SDL",  
  }
];