import { TopNavigationAccount } from "./top-navigation-account";


export function TopNavigation(){

    return(
        <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
            <ul className="flex gap-4">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <TopNavigationAccount />    
        </nav>
    )
}