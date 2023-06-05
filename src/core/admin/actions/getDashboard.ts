import DashboardRepository from 'src/core/admin/repository/DashboardRepository';
import { Dashboard } from '../entity/Dashboard';

export default class GetDashboard {

    private dashboardRepository: DashboardRepository

    constructor(dashboardRepository: DashboardRepository) {
      this.dashboardRepository = dashboardRepository;
    }

    async execute(): Promise<Dashboard | {}> {
        return this.dashboardRepository.get();    
    }
}