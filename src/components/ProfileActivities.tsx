import type { profile } from "../types/profile";

export const ProfileActivities=({row, content}:profile) =>{
return(
    <tr className="p-profile__label">
        <td>
            {row}
        </td>
        <td>
            {content}
        </td>
    </tr>
)
}