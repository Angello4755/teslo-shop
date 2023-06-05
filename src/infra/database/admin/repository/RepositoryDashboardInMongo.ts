import { Dashboard } from "src/core/admin/entity/Dashboard";
import DashboardRepository from "src/core/admin/repository/DashboardRepository";
import productsApi from "src/infra/api/productsApi";

export default class RepositoryDashboardInMongo implements DashboardRepository {
    async get(): Promise<{} | Dashboard> {
        try {
            const dashboard: Dashboard  = await productsApi.post(`/admin/dashboard`);
            return Promise.resolve(dashboard);
        } catch(error: any) {
            const message = error.response.data.message || 'error';
            return Promise.resolve({ error: message });
        }
    }
}