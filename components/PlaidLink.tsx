import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import Image from 'next/image'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data.linkToken);
    };

    getLinkToken()
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token: string | null) => {
    if (!public_token) return;

    await exchangePublicToken({
      publicToken: public_token, 
      user,
    });

    router.push('/');
  }, [user]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
          Link Bank Account
        </Button>
      ) : variant === "ghost" ? (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-ghost">
          <Image src="/icons/connect-bank.svg" width={24} height={24} alt="Conenct Bank" />
          <p className="hiddenl text=[16px] font-semibold text-black-2 xl:block">Link Bank Account</p>
        </Button>
      ) : (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-default">
          <Image src="/icons/connect-bank.svg" width={24} height={24} alt="Conenct Bank" />
          <p className="text=[16px] font-semibold text-black-2">Link Bank Account</p>
        </Button>
      )}
    </>
  )
}

export default PlaidLink