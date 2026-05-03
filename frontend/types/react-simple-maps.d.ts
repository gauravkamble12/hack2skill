declare module "react-simple-maps" {
  import { ComponentType, ReactNode } from "react";

  export interface ComposableMapProps {
    width?: number;
    height?: number;
    projection?: string | ((x: number, y: number, z: number) => { x: number; y: number });
    projectionConfig?: Record<string, unknown>;
    style?: Record<string, unknown>;
    className?: string;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography?: string | Record<string, unknown> | string[];
    children: (data: { geographies: Record<string, unknown>[] }) => ReactNode;
    parseGeographies?: (geographies: Record<string, unknown>[]) => Record<string, unknown>[];
    childrenAsFunction?: boolean;
  }

  export interface GeographyProps {
    geography: Record<string, unknown>;
    children?: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    style?: {
      default?: Record<string, unknown>;
      hover?: Record<string, unknown>;
      pressed?: Record<string, unknown>;
    };
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    onMoveStart?: () => void;
    onMove?: () => void;
    onMoveEnd?: () => void;
    onZoomStart?: () => void;
    onZoomEnd?: () => void;
    className?: string;
    style?: Record<string, unknown>;
    children?: ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}