import { Link } from "react-scroll";

const GlassNavBar = () => {
    return (
        <div className="sticky top-24 right-5 flex flex-col items-center space-y-3 z-50">
            {/* Nav Item: Home */}
            <div className="bg-black/50 backdrop-blur-md rounded-full py-1 px-3 shadow-lg">
                <Link
                    to="home"
                    smooth={true}
                    duration={500}
                    className="text-gray-300 hover:text-white text-sm cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    Home
                </Link>
            </div>

            {/* Nav Item: About */}
            <div className="bg-black/50 backdrop-blur-md rounded-full py-1 px-3 shadow-lg">
                <Link
                    to="about"
                    smooth={true}
                    duration={500}
                    className="text-gray-300 hover:text-white text-sm cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    About
                </Link>
            </div>

        </div>
    );
};
