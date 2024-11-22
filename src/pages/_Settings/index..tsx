

import Title from "@/components/Title"
import "./styles.scss"
import ProfileSettings from "@/components/ProfileSettings"

export default function Settings() {
    

    return (
        <div id="settings" className="container-fluid px-4 pt-2">
            <Title>Settings</Title>
            <div className="container-fluid p-4">
                <ProfileSettings/>
            </div>
        </div>
    )
}