import { Link } from "react-router-dom";
import { useActiveSection } from "../hooks/useSection";

function HeaderLink({path, section, children, width = "min-w-12 sm:min-w-32 lg:min-w-64"}){
    const {activeSection} = useActiveSection()

    return (
        <Link to = {path} className={`${section === activeSection ? "active": ""} mt-4 text-white text-center bg-black/50 text-[16px] xl:text-[24px] ${width} outline-2 outline-gray-400 py-1`}>
            <div className="mx-1 outline-2 outline-transparent hover:outline-2 hover:outline-white">
                {children}
            </div>
        </Link>
    )
}

export function Header (){
    const {activeSection} = useActiveSection()

    if (activeSection === "home") return null;

    return (
        <header>
        <nav className="bg-black/25 border-b-2 border-gray-400 items-center justify-center">
            <div className="flex mx-auto justify-between max-w-6xl px-5">
                <HeaderLink path = "/" section = "home" width = "min-w-8">
                    <i className = "fa fa-home"/>
                </HeaderLink>
                <div className="flex gap-x-2">
                    <HeaderLink path = "/information" section = "information">
                        <div className="block sm:hidden"><i className = "fa-solid fa-list"/></div>
                        <p className = "hidden sm:block">Information</p>
                    </HeaderLink>
                    <HeaderLink path = "/terminal" section = "terminal">
                        <div className="block sm:hidden"><i className = "fa-solid fa-terminal"/></div>
                        <p className = "hidden sm:block">Terminal</p>
                    </HeaderLink>
                    <HeaderLink path = "/documentation" section = "documentation">
                        <div className="block sm:hidden"><i className = "fa-solid fa-book"/></div>
                        <p className = "hidden sm:block">Documentation</p>
                    </HeaderLink>
                </div>
                <div className="w-8"></div>
            </div>
        </nav>
        </header>
    )
}