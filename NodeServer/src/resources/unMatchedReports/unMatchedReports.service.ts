import UnMatchedReportsModel from '@/resources/unMatchedReports/unMatchedReports.model';
import IUnMatchedReports from './unMatchedReports.interface';
import { IAccident } from '@/resources/accident/accident.interface';
class UnMatchedReportsService {
    private unMatchedReports = UnMatchedReportsModel;

    public async addUnmatchedReport(accident: IAccident, damagedCarNumber: string): Promise<void> {
    try {
        console.log('here: addToUnmatchedReportsCollection');
        await this.unMatchedReports.create({accident,damagedCarNumber});
    } catch (error: any) {
        console.log('addUnmatchedReport: ' + error.message);
    }

    };
}

export default UnMatchedReportsService;
