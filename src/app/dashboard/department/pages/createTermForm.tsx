import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {};
function CreateTermForm({register}: any) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input {...register("name")} id="name" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Start Date
        </Label>
        <Input {...register("startDate")} type="date" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          End Date
        </Label>
        <Input {...register("endDate")} type="date" className="col-span-3" />
      </div>
    </div>
  );
}
export default CreateTermForm;  
