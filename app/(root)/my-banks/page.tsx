import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const MyBanks = async () => {
  const loggedInUser = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedInUser.$id});
  if (!accounts) return;

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox title="My Bank Accounts" subtext="Effortlessly manage your bank accounts"/>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((account: Account) => (
              <BankCard key={accounts.id} account={account} userName={loggedInUser?.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks