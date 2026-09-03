import { profileAboutList } from "../Data/profileAboutData";
import { profileActivitiesList } from "../Data/profileActivitiesData";
import { ProfileActivities } from "./ProfileActivities";
import { ProfileAbout } from "./ProflieAbout";

export const Profile = () =>{
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
                            {
                                profileAboutList.map(about =>(
                                    <ProfileAbout
                                    key={about.id}
                                    row={about.row}
                                    content={about.content}
                                    />
                                ))
                            }
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
                            {
                                profileActivitiesList.map(active=>(
                                    <ProfileActivities
                                    key={active.id}
                                    row={active.row}
                                    content={active.content}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
    );
}