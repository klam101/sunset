import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'; 
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async({ searchParams }: SearchParamProps) => {
  const { id, page } = await searchParams;
  const currentPage = parseInt(page as string) || 1;
  const loggedInUser = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedInUser.$id});
  if (!accounts) return;

  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedInUser?.firstName || "Guest"}
            subtext="Access & Manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions accounts={accounts?.data} transactions={account?.transactions} appwriteItemId={appwriteItemId} page={currentPage} />
      </div>

      <RightSidebar user={loggedInUser} transactions={account?.transactions} banks={accounts?.data?.slice(0, 2)} />
    </section>
  )
}

export default Home