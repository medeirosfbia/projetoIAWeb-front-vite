import { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit, FiLogOut, FiSidebar, FiHelpCircle } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import EditUserModal from '../editUser/EditUserModal';
import AuthContext from '@/contexts/AuthContext';
import { listChats } from '@/services/ChatService';
import { ToastAlerts } from '@/utils/ToastAlerts';
import { useHotkeys } from 'react-hotkeys-hook';

interface Chat {
    chat_id: string;
    title: string;
    updated_at: Date;
}

function Sidebar() {

    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [chats, setChats] = useState<Chat[]>([]);

    const { user, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerts('Usuário deslogado com sucesso', "info");
        navigate('/login');
    }

    useEffect(() => {
        async function fetchChats() {
            if (user && user.username) {
                try {
                    const chatsList = await listChats('http://localhost:5000/chats', user.username);
                    setChats(chatsList);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        fetchChats();
    }, [user]);

    useHotkeys('ctrl+shift+l', () => logout(), [user]);



    return (
        <>
            <div className={`h-screen bg-neutral-800 text-gray-100 flex flex-col ${isCollapsed ? 'w-15' : 'w-80'} transition-all duration-300`}>
                <div className="flex items-center justify-between h-12  border-b border-gray-700 p-4">
                    {
                        !isCollapsed && (
                            <button className='flex items-center'>
                                <FiEdit className='w-6 h-6 mr-2' />
                                <h1 className=" text-lg  ">Novo Chat
                                </h1>
                            </button>
                        )
                    }
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className='text-gray-100 focus:outline-none'
                    >
                        {isCollapsed ? <FiSidebar size={24} /> : <AiOutlineClose size={24} />}
                    </button>
                </div>
                <div className='flex-1 flex flex-col justify-between overflow-hidden'>
                    <nav className={` ${!isCollapsed ? 'overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 max-h-[500px]' : ''} flex-1`}>
                        {chats.map(chat => (
                            <div
                                key={chat.chat_id}
                                className={`flex items-center gap-2 ${!isCollapsed ? 'px-3 py-2 mb-1 rounded-md bg-neutral-800 hover:bg-neutral-700 cursor-pointer transition-colors' : ''}`}
                                onClick={() => navigate(`/chat/${chat.chat_id}`)}
                            >
                                <span className={`ml-2 transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'} flex-1`}>
                                    {!isCollapsed && (
                                        <p className="truncate font-normal text-gray-200">{chat.title}</p>
                                    )}
                                </span>
                            </div>
                        ))}
                    </nav>


                    <div className='mb-10 transition-opacity duration-300 delay-300'>
                        {/* <button className='flex items-center py-2.5 px-4 w-full text-left rounder transition duration-300 hover:bg-gray-900 hover:text-white'>
                            <EditUserModal />
                            <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                {
                                    !isCollapsed && "Editar Perfil"
                                }
                            </span>
                        </button> */}
                        <EditUserModal isCollapsed={isCollapsed} />
                        <Link to="/help">
                          <button className='flex items-center py-2.5 px-4 w-full text-left rounder transition duration-300 hover:bg-blue-700 hover:text-white'>
                            <FiHelpCircle className='w-6 h-6 mr-2' />
                            <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                              {!isCollapsed && "Ajuda"}
                            </span>
                          </button>
                        </Link>
                        <Link to="/" className='' onClick={logout} >
                        <button className='flex items-center py-2.5 px-4 w-full text-left rounder transition duration-300 hover:bg-red-700 hover:text-white'>
                            <FiLogOut className='w-6 h-6 mr-2' />
                            <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                {
                                    !isCollapsed && "Sair"
                                }
                            </span>
                        </button></Link>
                    </div>
                </div>
            </div>

        </>
    );

}

export default Sidebar