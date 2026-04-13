import { getLevels } from "@/actions/get-levels";
import { getMySubscriptions } from "@/actions/get-my-subscriptions";
import { PlansTable } from "../_components/plans-table";

const PlanPage = async () => {
    const levels = await getLevels();
    const subscriptions = await getMySubscriptions();

    return ( 
        <div className="">
            <PlansTable 
                levels={levels} 
                activeSubscriptions={subscriptions}
            />
        </div>
    );
}
 
export default PlanPage;