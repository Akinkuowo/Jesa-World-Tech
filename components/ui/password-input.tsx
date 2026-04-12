import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  showChecklist?: boolean;
}

export function PasswordInput({ error, showChecklist = true, className, ...props }: PasswordInputProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const meetsRequirements = {
    length: password.length >= 8,
    letter: /[a-zA-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const requirementsList = [
    { label: "At least 8 characters", met: meetsRequirements.length },
    { label: "At least one letter", met: meetsRequirements.letter },
    { label: "At least one number", met: meetsRequirements.number },
    { label: "Special character", met: meetsRequirements.special },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          className={`pr-10 ${className || ""}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {showChecklist && (
        <div className="grid grid-cols-1 gap-1.5 mt-3">
          {requirementsList.map((req, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${
                req.met ? "text-emerald-400" : "text-slate-400"
              }`}
            >
              <CheckCircle2
                className={`w-3 h-3 transition-colors duration-300 ${
                  req.met ? "text-emerald-400" : "text-slate-300/30"
                }`}
              />
              {req.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
