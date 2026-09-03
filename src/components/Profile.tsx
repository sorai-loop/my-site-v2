export default function Profile(){
    return(
        <section id="profile-section" className="l-scroll__adjustment-top c-container p-profile">
                <h2 className="c-heading">
                    Profile
                </h2>
                <div className="p-profile__inner">
                    <table className="p-profile__table">
                        <caption className="p-profile__title">
                            about me
                        </caption>
                        <tbody>
                            <tr>
                                <th scope="row" className="p-profile__label">
                                    H.N
                                </th>
                                <td className="p-profile__data">
                                    そらい、空彩來
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="p-profile__label">
                                    生年月日
                                </th>
                                <td className="p-profile__data">
                                    2006/11/26
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="p-profile__label">
                                    趣味
                                </th>
                                <td className="p-profile__data">
                                    ダンス、ゲーム、スノーボード
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="p-profile__label">
                                    関心領域
                                </th>
                                <td className="p-profile__data">
                                    web系全般、Unity、UE5、C++、Go
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-profile__inner">
                    <table className="p-profile__table">
                        <caption className="p-profile__title">
                            Activities
                        </caption>
                        <thead>
                            <tr>
                                <th className="p-profile__head">
                                    Date
                                </th>
                                <th className="p-profile__head">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="p-profile__label">
                                <td>
                                    2026/2/22
                                    ~
                                    2026/3/29
                                </td>
                                <td>
                                    GDGoC Japan Hackathonに仙台会場運営On-SiteLeadとして参加しました
                                </td>
                            </tr>
                            <tr className="p-profile__label">
                                <td>
                                    2025/10/18
                                </td>
                                <td>
                                    JPHACKS 2025に参加しました
                                </td>
                            </tr>
                            <tr className="p-profile__label">
                                <td>
                                    2025/8/8
                                </td>
                                <td>
                                    テクノ・マインド_IT イノベーション⼈材育成プログラムに参加しました
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
    );
}