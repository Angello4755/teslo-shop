import GetDashboard from 'src/core/admin/actions/getDashboard';
import DashboardRepository from 'src/core/admin/repository/DashboardRepository';
import { Dashboard } from '../../core/admin/entity/Dashboard';
import RepositoryDashboardInMongo from '../database/admin/repository/RepositoryDashboardInMongo';



export class ProviderAdmin {
    private repo: DashboardRepository;

    constructor() {
        this.repo = new RepositoryDashboardInMongo();
    }

    
    getDashboard(): GetDashboard {
        return new GetDashboard(this.repo);
    }
}