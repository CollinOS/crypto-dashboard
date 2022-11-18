
function LoadingRow() {
  return (
    <div>
      <tr className='rounded-lg duration-100 hover:bg-dark-hov'>
      <td className='border-b border-dark-border px-4 py-4 text-secondary font-medium w-8'></td>
      <td className='border-b border-dark-border px-4 py-4 text-secondary font-medium w-20'>0</td>
      <td className='border-b border-dark-border px-4 py-4'>
        <div className='flex'>
          <div className='flex-col'>
             <div className='w-[20px] h-[20px] rounded-full bg-secondary'/>
          </div>
          <div className='mx-3 flex-auto'>
            <span className='mr-3 text-secondary font-bold'>CryptoTrack</span>
            <span className='text-secondary text-sm'>{coin.symbol.toUpperCase()}</span>
          </div>
        </div>
      </td>
      <td className='border-b border-dark-border px-4 py-4 text-secondary font-medium text-right'>$0.00</td>
      <td className='text-secondary border-b border-dark-border px-4 py-4 text-right'>0.00%</td>
      <td className='border-b border-dark-border px-4 py-4 text-secondary font-medium text-right'>$0,000,000,000</td>
      <td className='border-b border-dark-border px-4 py-4 text-secondaryfont-medium text-right'>$0,000,000,000</td>
    </tr>
    </div>
  )
}
export default LoadingRow;