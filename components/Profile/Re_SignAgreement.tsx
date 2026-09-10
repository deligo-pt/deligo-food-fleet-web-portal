'use client';
import { Button } from '@/components/ui/button';
import TitleHeader from '@/components/TitleHeader/TitleHeader';
import { useTranslation } from '@/hooks/use-translation';
import { IAgreement } from '@/types/agreement.type';
import { useRouter } from 'next/navigation';
import AgreementViewer from '../BecomeAgent/AgreementViewer';

interface IProps {
    agreement: IAgreement;
    fleetId: string;
}

const Re_SignAgreement = ({ agreement, fleetId }: IProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <div>
            {/* Page Title */}
            <TitleHeader title={t("re_sign_agreement")} subtitle={t("review_nd_sign_the_agreement_below")} />
            {
                !agreement?.status ? (
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-xl mb-3'>Agreement signed successfully!</p>
                        <Button type="button" className="bg-[#DC3173] text-white" variant="link" onClick={() => router.push("/vendor/dashboard")}>
                            {t("goBack")}
                        </Button>
                    </div>
                ) : (

                    <AgreementViewer agreement={agreement} fleetId={fleetId} type="re-sign" />
                )
            }
        </div>
    );
};

export default Re_SignAgreement;