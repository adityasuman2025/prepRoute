import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/routes';
import logo from '@/assets/logo.svg';

export default function Navbar() {
    return (
        <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col py-6 select-none shrink-0 font-sans">
            <div className="px-6 mb-12">
                <img src={logo} alt="Preproute Logo" className="h-9 w-fit object-contain" />
            </div>

            <nav className="flex-1 px-3">
                <ul className="space-y-1 list-none p-0 m-0">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3.5 pl-3 pr-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                                            ? 'text-brand-primary bg-[#F8FAFF] border-l-[5px] border-brand-primary group'
                                            : 'text-brand-gray hover:text-brand-primary hover:bg-slate-50 border-l-[5px] border-transparent group'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                className={`w-5 h-5 transition-all duration-200 ${isActive
                                                    ? 'text-brand-primary'
                                                    : 'text-brand-gray group-hover:text-brand-primary'
                                                    }`}
                                            />

                                            <span>{item.name}</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
