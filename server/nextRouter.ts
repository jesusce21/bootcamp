// #region Global Imports
import type { ComponentType } from 'react';
import NextRoutesLib from 'next-routes';


const nextRoutes = new NextRoutesLib();



interface ILinkProps {
  route: string;
  params?: { [k: string]: string | number };
  passHref?: boolean;
  prefetch?: boolean;
}

export const Link: ComponentType<ILinkProps> = nextRoutes.Link;

export const { Router } = nextRoutes;

export default nextRoutes;
