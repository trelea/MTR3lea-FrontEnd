
import { Loyout } from "../../components/Loyout";
import { UpdateCardUser } from "../../components/UpdateCardUser";

export const Profile = () => {

    return (
        <Loyout>
            <div className="bg-slate-100 pt-20 flex flex-col items-center w-screen p-2">
                <div className="flex flex-col gap-2 w-full sm:w-[95%] md:w-[80%] lg:w-[65%] xl:w-[50%] 2xl:w-[40%] min-h-screen">
                    <UpdateCardUser />
                </div>         
            </div>
        </Loyout>
    )
}