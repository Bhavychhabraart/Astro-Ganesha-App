import React, { useState } from 'react';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { ChevronRightIcon, BellIcon, UserIcon, LogOutIcon } from '../components/Icons';

export const SettingsPage: React.FC = () => {
    const [notifications, setNotifications] = useState({
        push: true,
        email: true,
        promotions: false
    });
    
    const handleNotificationChange = (key: keyof typeof notifications) => (checked: boolean) => {
        setNotifications(prev => ({...prev, [key]: checked}));
    };
    
    const SettingRow: React.FC<{label: string, description: string, children: React.ReactNode}> = ({label, description, children}) => (
        <div className="flex justify-between items-center py-4">
            <div>
                <h4 className="font-semibold text-brand-text-primary">{label}</h4>
                <p className="text-sm text-brand-text-secondary">{description}</p>
            </div>
            {children}
        </div>
    );
    
    const SettingSection: React.FC<{icon: React.FC<any>, title: string, children: React.ReactNode}> = ({icon: Icon, title, children}) => (
        <div className="bg-brand-card rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="font-serif text-xl font-bold text-brand-text-primary flex items-center gap-3 mb-2">
                <Icon className="w-6 h-6 text-brand-primary"/>
                {title}
            </h3>
            <div className="divide-y divide-brand-surface">
                {children}
            </div>
        </div>
    );

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Settings</h1>
                <p className="text-lg text-brand-text-secondary">Manage your account and preferences.</p>
            </header>
            
            <div className="space-y-6">
                <SettingSection icon={BellIcon} title="Notifications">
                    <SettingRow label="Push Notifications" description="For chat messages and alerts">
                        <ToggleSwitch checked={notifications.push} onChange={handleNotificationChange('push')} />
                    </SettingRow>
                    <SettingRow label="Email Notifications" description="For order confirmations and newsletters">
                         <ToggleSwitch checked={notifications.email} onChange={handleNotificationChange('email')} />
                    </SettingRow>
                     <SettingRow label="Promotional Offers" description="Receive updates on special offers">
                         <ToggleSwitch checked={notifications.promotions} onChange={handleNotificationChange('promotions')} />
                    </SettingRow>
                </SettingSection>

                <SettingSection icon={UserIcon} title="Account & Privacy">
                     <SettingRow label="Change Password" description="Update your security credentials">
                        <button className="p-2 text-brand-text-secondary hover:text-brand-primary rounded-full hover:bg-brand-surface"><ChevronRightIcon className="w-5 h-5"/></button>
                    </SettingRow>
                     <SettingRow label="Privacy Policy" description="Read our data usage policy">
                        <button className="p-2 text-brand-text-secondary hover:text-brand-primary rounded-full hover:bg-brand-surface"><ChevronRightIcon className="w-5 h-5"/></button>
                    </SettingRow>
                </SettingSection>

                <div className="mt-8">
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-surface text-brand-red font-bold rounded-lg hover:bg-red-50 transition-colors">
                        <LogOutIcon className="w-5 h-5"/>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
};
