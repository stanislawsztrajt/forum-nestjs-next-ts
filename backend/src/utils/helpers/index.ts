export const parseResponse: (res: any) => any = (res: any) => {
  return JSON.parse(JSON.stringify(res))
}