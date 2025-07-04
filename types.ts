
export interface LogoDetails {
  name: string;
  description: string;
  style: string;
  colors: string;
}

export interface LogoResult {
  images: {
    primary: string;
    horizontal: string;
    vertical: string;
    icon: string;
  };
  description: string;
}
