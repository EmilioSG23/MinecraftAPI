import { useState } from "react";
import { Link } from "react-router-dom";

function HeaderLink(props){
    const {path, active, children, width = "min-w-12 sm:min-w-32 lg:min-w-64"} = props;
    return (
        <Link to = {path} className={`${active} mt-4 text-white text-center bg-black/50 text-[16px] xl:text-[24px] ${width} outline-2 outline-gray-400 py-1`}>
            <div className="mx-1 outline-2 outline-transparent hover:outline-2 hover:outline-white">
                {children}
            </div>
        </Link>
    )
    
}

export function Header (props){
    const {initialSection} = props
    const [activeSection, setActiveSection] = useState(initialSection);

    return (
        <nav className="bg-black/25 border-b-2 border-gray-400 items-center justify-center">
            <div className="flex mx-auto justify-between max-w-6xl px-5">
                <HeaderLink path = "/" active = {activeSection === "home" ? "active" : ""} width = "min-w-8">
                    <i className = "fa fa-home"/>
                </HeaderLink>
                <div className="flex gap-x-2">
                    <HeaderLink path = "/information" active = {activeSection === "information" ? "active" : ""}>
                        <div className="block sm:hidden"><i className = "fa-solid fa-list"/></div>
                        <p className = "hidden sm:block">Information</p>
                    </HeaderLink>
                    <HeaderLink path = "/terminal" active = {activeSection === "terminal" ? "active" : ""}>
                        <div className="block sm:hidden"><i className = "fa-solid fa-terminal"/></div>
                        <p className = "hidden sm:block">Terminal</p>
                    </HeaderLink>
                    <HeaderLink path = "/documentation" active = {activeSection === "documentation" ? "active" : ""}>
                        <div className="block sm:hidden"><i className = "fa-solid fa-book"/></div>
                        <p className = "hidden sm:block">Documentation</p>
                    </HeaderLink>
                </div>
                <div className="w-8"></div>
            </div>
        </nav>
    )
}