import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CustomCardProps {
  title: string;
  description?: string;
  isEdit?: boolean;
  children: React.ReactNode;
  setFormDisabled?: () => void;
  formDisabled?: boolean;
}

export default function CustomCard({
  title,
  description,
  isEdit,
  setFormDisabled,
  children,
  formDisabled,
}: CustomCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {isEdit && (
          <CardAction>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={setFormDisabled}
            >
              {!formDisabled ? "Cancel edit" : "Edit"}
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* <CardFooter className="flex gap-2 justify-end">
        
      </CardFooter> */}
    </Card>
  );
}
