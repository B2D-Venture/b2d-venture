interface CompanyCardProps {
import PitchDescription from '../components/PitchDescription';
    logoUrl: string;
    backgroundUrl: string;
    companyName: string;
    shortDescription: string;
    investmentGoal: number;
    investorCount: number;
    minInvest: number;
};

interface PitchDescriptionProps {
    label: string;
    desc: string;
};