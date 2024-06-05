import './style.scss'

export default function DropDown(props) {
    return (
        <div
            {...props}
            class={`${props.className} dropdown`}
        >
            <div id="dropdownMenuButtonTheme" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-brush me-1"></i> Theme</div>
            <ul class="dropdown-menu my-0 py-0 dropdown-menu-light w-100" aria-labelledby="dropdownMenuButtonTheme">
                {props.children}
            </ul>
        </div>
    )
} 