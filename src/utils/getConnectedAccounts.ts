export function getConnectedAccounts(): string{
  const connectedAccounts = document.getElementById('connectedAccounts') as HTMLInputElement;
  if(connectedAccounts && connectedAccounts.value){
    return connectedAccounts.value;
  }
  console.warn('no connected accounts!');
  return '';
}