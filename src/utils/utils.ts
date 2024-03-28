export const formatTime = (jsonTime: string) => {
  const dateObject = new Date(jsonTime)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }

  return dateObject.toLocaleString('en-US', options).replace(',', '')
}
