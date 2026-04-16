import { Check, Copy, ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useCallback } from "react";

import type { PoolAddress } from "~/config/poolAddresses";

interface IDepositAddressCardProps {
  pool: PoolAddress;
}

export const DepositAddressCard = ({ pool }: IDepositAddressCardProps): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(pool.address)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => undefined);
  }, [pool.address]);

  // URI for QR code (e.g. "bitcoin:bc1q..." or just the address for chains without a standard URI)
  const qrValue = pool.uriPrefix ? `${pool.uriPrefix}${pool.address}` : pool.address;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-lg font-semibold uppercase dark:text-white">{pool.symbol}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">{pool.chain}</p>
        </div>

        {pool.explorerUrl && (
          <a
            className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
            href={pool.explorerUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Explorer
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <div className="flex justify-center rounded-lg bg-white p-4">
        <QRCodeSVG bgColor="#ffffff" fgColor="#000000" level="M" size={160} value={qrValue} />
      </div>

      <div className="flex items-center gap-2 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p className="flex-1 break-all font-mono text-xs dark:text-gray-300">{pool.address}</p>

        <button
          aria-label="Copy address"
          className="shrink-0 rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          type="button"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};
