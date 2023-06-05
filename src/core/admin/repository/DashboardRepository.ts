import { Dashboard } from "src/core/admin/entity/Dashboard";

export default interface DashboardRepository {
     get() : Promise<Dashboard | {}>
}