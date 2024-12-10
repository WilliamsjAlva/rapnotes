import { useNavigate } from "react-router-dom";

const HomeLoggedIn = () => {
    const navigate = useNavigate();

    return (
        <main className="w-full h-screen flex items-center bg-gradient-to-br px-10">
            <div className="w-1/2 flex flex-col justify-center items-start">
                <h1 className="text-6xl font-bold text-black dark:text-white mb-6">La app #1 de notas</h1>
                <h4 className="text-lg text-black dark:text-white mb-8">Con RapNote, mantén tus notas organizadas y fácilmente consultables.</h4>
                <div className="flex space-x-4">
                    <button onClick={() => navigate("/notes")} className="px-6 py-3 text-black dark:text-white rounded-md text-lg font-semibold border-black dark:border-white border-[1px]">Mis Notas</button>
                </div>
            </div>
            <div className="w-1/2 flex justify-center">
                <img src="./src/assets/img/1.png" alt="RapNote Illustration" className="w-72 h-auto object-contain hidden min-[590px]:block" />
            </div>
        </main>
    );
};

export default HomeLoggedIn;
