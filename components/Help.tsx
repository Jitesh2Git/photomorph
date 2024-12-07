import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

export const Help = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-5 right-5 z-50 bg-[#6466f1] text-white font-semibold
        rounded-full px-3 py-2 shadow-lg hover:bg-white transition hover:text-[#6466f1]
        border-2 border-white hover:border-[#6466f1] text-xs flex items-center justify-center"
        >
          Help
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg shadow-xl bg-white max-w-md mx-auto max-sm:text-xs">
        <AlertDialogHeader className="border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800 max-sm:text-sm">
            &ldquo;Hey, don&apos;t stress! I Got Your Back!&rdquo; 👨‍💻
          </h2>
        </AlertDialogHeader>

        <div>
          <AlertDialogTitle className="text-base font-medium text-gray-800 max-sm:text-sm">
            Login &amp; Payment Test Info
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600 mt-2 max-sm:text-xs">
            A humble request: Please don&apos;t change the login password.
          </AlertDialogDescription>

          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800">Login Info:</h3>
            <p className="text-sm text-gray-700 max-sm:text-xs">
              <span className="font-medium">Email:</span> demo@gmail.com
            </p>
            <p className="text-sm text-gray-700 max-sm:text-xs">
              <span className="font-medium">Password:</span> demo@userpass
            </p>

            <h3 className="font-semibold text-gray-800 mt-2">Payment Info:</h3>
            <ul className="text-sm text-gray-700 max-sm:text-xs">
              <li>
                <span className="font-medium">Card Number:</span> 4242 4242 4242
                4242
              </li>
              <li>
                <span className="font-medium">Expiry:</span> Any future date
              </li>
              <li>
                <span className="font-medium">CVC:</span> Any 3 digits
              </li>
            </ul>
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800">
              Don&apos;t Overuse Transformations:
            </h3>
            <p className="text-sm text-gray-700 max-sm:text-xs">
              Look, I know transformations are cool, but trust me, I&apos;m
              using the free AI plan here. It doesn&apos;t come with unlimited
              requests, so please be mindful when testing (try just one,
              please!). You can still test the payments freely as many times as
              you want — no restrictions on that. Thanks!
            </p>
          </div>
        </div>

        <AlertDialogFooter className="border-t">
          <AlertDialogCancel
            className="w-full py-2 px-6 font-medium bg-[#6466f1] text-white 
              transition-all shadow-[3px_3px_0px_black] hover:translate-x-[3px]
              hover:translate-y-[3px] hover:bg-[#4f51e5] hover:text-white rounded-md"
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
