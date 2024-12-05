import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserInputProps {
  onSubmit: (userId: string) => void;
  isLoading: boolean;
}

const UserInput = ({ onSubmit, isLoading }: UserInputProps) => {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onSubmit(userId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 rounded-lg h-12"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={!userId.trim() || isLoading}
        className="min-w-[140px] h-12 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
      >
        {isLoading ? "Loading..." : "Get Recommendations"}
      </Button>
    </form>
  );
};

export default UserInput;