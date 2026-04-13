"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Shield, Camera, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

import { useAuth } from "@/components/providers/auth-provider";
import { FileUpload } from "@/components/file-upload";
import { updateProfile } from "@/actions/update-profile";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImageUrl(user.image || "");
    }
  }, [user]);

  const onUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const res = await updateProfile({ name, image: imageUrl });
      
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Profile updated!");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-electric-blue-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="flex flex-col gap-y-2 mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-slate-500">
          Manage your profile information and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-electric-blue-50 bg-slate-100">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className="h-16 w-16 text-slate-300" />
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsEditingImage(!isEditingImage)}
                className="absolute bottom-0 right-0 p-2 bg-electric-blue-600 text-white rounded-full shadow-lg hover:bg-electric-blue-700 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900">{user.name || "User"}</h2>
            <p className="text-sm text-slate-500 mb-6">{user.role}</p>
            
            <div className="w-full pt-6 border-t border-slate-100 flex flex-col gap-y-3">
              <div className="flex items-center gap-x-2 text-xs text-slate-500 px-3 py-2 bg-slate-50 rounded-lg">
                <Mail className="h-3.5 w-3.5 text-electric-blue-500" />
                {user.email}
              </div>
              <div className="flex items-center gap-x-2 text-xs text-slate-500 px-3 py-2 bg-slate-50 rounded-lg">
                <Shield className="h-3.5 w-3.5 text-electric-blue-500" />
                {user.role} Account
              </div>
            </div>
          </div>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Profile Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">General Profile</h3>
            
            {isEditingImage && (
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-slate-700">Update Profile Picture</span>
                  <button 
                    onClick={() => setIsEditingImage(false)}
                    className="text-xs text-slate-500 hover:text-red-500"
                  >
                    Cancel
                  </button>
                </div>
                <FileUpload
                  endpoint="userImage"
                  onChange={(url) => {
                    if (url) {
                      setImageUrl(url);
                      setIsEditingImage(false);
                      toast.success("Image uploaded! Don't forget to save.");
                    }
                  }}
                />
              </div>
            )}

            <form onSubmit={onUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-electric-blue-500/50 focus:ring-1 focus:ring-electric-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={cn(
                    "flex items-center justify-center gap-x-2 w-full md:w-auto px-8 py-3 bg-electric-blue-600 text-white font-bold rounded-xl hover:bg-electric-blue-700 transition-all",
                    isUpdating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Security</h3>
            <p className="text-sm text-slate-500 mb-6">
              Manage your account security and password.
            </p>
            <button
               onClick={() => router.push("/reset")}
               className="text-sm font-semibold text-electric-blue-600 hover:underline"
            >
              Change your password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
