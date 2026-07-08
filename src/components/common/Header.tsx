import React from 'react';
import bellSvg from '@/assets/bell.svg';
import avatarSvg from '@/assets/avatar.svg';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import { STORAGE_KEYS } from '@/constants/storage';
import { getStorageItem } from '@/utils/storage';

export default function Header() {
    const user = getStorageItem<{ name?: string; userId?: string; role?: string }>(STORAGE_KEYS.USER);
    const userName = user?.name || user?.userId || 'Alex Wando';
    const userRole = user?.role || 'Admin';

    return (
        <header className="h-24 w-full bg-white border-b border-slate-200 px-8 flex items-center justify-end gap-6 select-none font-sans shrink-0">
            <button className="relative p-2.5 rounded-full border border-slate-200 text-slate-500 focus:outline-none flex items-center justify-center">
                <img src={bellSvg} alt="Notifications" className="w-[21px] h-[23px] object-contain" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-green rounded-full border border-white" />
            </button>

            <div className="flex items-center gap-3 group">
                <img
                    src={avatarSvg}
                    alt={userName}
                    className="w-[47px] h-[47px] rounded-full object-contain bg-[#FFD284] border border-slate-200"
                />

                <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-slate-900 transition-colors">
                        {userName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium leading-normal">
                        {userRole}
                    </span>
                </div>

                <ChevronDownIcon className="mb-5 w-3 h-3 text-black group-hover:text-slate-600 transition-colors duration-200 shrink-0" />
            </div>
        </header>
    );
}
