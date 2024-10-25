import { StyledBanner } from "../../components/Login/Content/Banner/Banners.styles"
import { StyledContent } from "../../components/Login/Content/Content.styles.tsx"
import { StyledLogin } from "../../components/Login/Login.styles"
import SignIn from "../../components/Login/Content/Sign-in"
import SignUp from "../../components/Login/Content/Sign-up"
import banner from '../../assets/login-banner.png'
import { useContext, useState } from "react"
import Loading from "../../components/Loading/index.tsx"
import { AuthContext } from "../../Context/AuthContext.tsx"

export interface MoveType {
    setMove_x?: React.Dispatch<React.SetStateAction<string>>
    setMove_y?: React.Dispatch<React.SetStateAction<string>>
    move_y?: string
    move_x?: string
}

export default function Login() {
    const [move_x, setMove_x] = useState('right')
    const [move_y, setMove_y] = useState('top')
    const { loading } = useContext(AuthContext)!

    return (
        <StyledLogin>
            {loading ? <Loading/> :
                <StyledContent>
                    <div className='d-flex justify-content-center align-items-center'>
                        <SignIn setMove_x={setMove_x} setMove_y={setMove_y} />
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <SignUp setMove_x={setMove_x} setMove_y={setMove_y} />
                    </div>
                    <StyledBanner move_x={move_x} move_y={move_y}>
                        <img src={banner} alt="login-banner" />
                    </StyledBanner>
                </StyledContent>}

        </StyledLogin>
    )
}