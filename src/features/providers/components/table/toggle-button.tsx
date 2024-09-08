import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ToggleFilter = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id={`filter-${label.toLowerCase().replace(" ", "-")}`}
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label htmlFor={`filter-${label.toLowerCase().replace(" ", "-")}`}>
        {label}
      </Label>
    </div>
  );
};

export default ToggleFilter;
