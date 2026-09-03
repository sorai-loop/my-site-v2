import type { profile } from "../types/profile";

export const ProfileAbout = ({row, content}:profile)=>{
    return(
        <tr>
            <th scope="row" className="p-profile__label">
                {row}
            </th>
            <td className="p-profile__data">
                {content}
            </td>
        </tr>
    );
}