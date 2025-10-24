/**
 * TypeScript type definitions for DXF parser
 */

/**
 * Point in 2D or 3D space
 */
export interface Point {
  x: number;
  y: number;
  z?: number;
}

/**
 * DXF color represented as RGB array
 */
export type RGBColor = [number, number, number];

/**
 * Transform applied to entities
 */
export interface Transform {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  rotation?: number;
  extrusionX?: number;
  extrusionY?: number;
  extrusionZ?: number;
}

/**
 * Base properties common to all entities
 */
export interface BaseEntity {
  type: string;
  handle?: string;
  layer?: string;
  lineTypeName?: string;
  lineTypeScale?: number;
  visible?: boolean;
  colorNumber?: number;
  paperSpace?: number;
  viewportOn?: number;
  viewport?: number;
  extrusionX?: number;
  extrusionY?: number;
  extrusionZ?: number;
  layout?: string;
  transforms?: Transform[];
}

/**
 * LINE entity
 */
export interface LineEntity extends BaseEntity {
  type: 'LINE';
  start: Point;
  end: Point;
  thickness?: number;
}

/**
 * CIRCLE entity
 */
export interface CircleEntity extends BaseEntity {
  type: 'CIRCLE';
  x: number;
  y: number;
  z?: number;
  r: number;
}

/**
 * ARC entity
 */
export interface ArcEntity extends BaseEntity {
  type: 'ARC';
  x: number;
  y: number;
  z?: number;
  r: number;
  startAngle: number;
  endAngle: number;
  thickness?: number;
}

/**
 * ELLIPSE entity
 */
export interface EllipseEntity extends BaseEntity {
  type: 'ELLIPSE';
  x: number;
  y: number;
  z?: number;
  majorX: number;
  majorY: number;
  majorZ?: number;
  axisRatio: number;
  startAngle: number;
  endAngle: number;
}

/**
 * Vertex for polylines
 */
export interface Vertex {
  x: number;
  y: number;
  z?: number;
  bulge?: number;
}

/**
 * POLYLINE entity
 */
export interface PolylineEntity extends BaseEntity {
  type: 'POLYLINE';
  vertices: Vertex[];
  closed?: boolean;
  polygonMesh?: boolean;
  polyfaceMesh?: boolean;
}

/**
 * LWPOLYLINE entity
 */
export interface LWPolylineEntity extends BaseEntity {
  type: 'LWPOLYLINE';
  vertices: Vertex[];
  closed?: boolean;
}

/**
 * SPLINE entity
 */
export interface SplineEntity extends BaseEntity {
  type: 'SPLINE';
  degree: number;
  controlPoints: Point[];
  knots: number[];
  weights?: number[];
}

/**
 * TEXT entity
 */
export interface TextEntity extends BaseEntity {
  type: 'TEXT';
  string: string;
  x: number;
  y: number;
  z?: number;
  x2?: number;
  y2?: number;
  z2?: number;
  textHeight?: number;
  rotation?: number;
  styleName?: string;
}

/**
 * MTEXT entity
 */
export interface MTextEntity extends BaseEntity {
  type: 'MTEXT';
  x: number;
  y: number;
  z?: number;
  nominalTextHeight?: number;
  refRectangleWidth?: number;
  attachmentPoint?: number;
  drawingDirection?: number;
  styleName?: string;
}

/**
 * INSERT entity
 */
export interface InsertEntity extends BaseEntity {
  type: 'INSERT';
  block: string;
  x: number;
  y: number;
  z?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  rotation?: number;
  rowCount?: number;
  columnCount?: number;
  rowSpacing?: number;
  columnSpacing?: number;
}

/**
 * Union type of all entity types
 */
export type Entity =
  | LineEntity
  | CircleEntity
  | ArcEntity
  | EllipseEntity
  | PolylineEntity
  | LWPolylineEntity
  | SplineEntity
  | TextEntity
  | MTextEntity
  | InsertEntity
  | BaseEntity;

/**
 * DXF layer definition
 */
export interface Layer {
  name: string;
  colorNumber: number;
  frozen?: boolean;
  off?: boolean;
}

/**
 * DXF line type definition
 */
export interface LineType {
  name: string;
  description?: string;
  elements?: any[];
}

/**
 * DXF style definition
 */
export interface Style {
  name: string;
  fontName?: string;
  textHeight?: number;
}

/**
 * Tables section containing layers, styles, and line types
 */
export interface Tables {
  layers: Record<string, Layer>;
  styles: Record<string, Style>;
  ltypes: Record<string, LineType>;
}

/**
 * Block definition
 */
export interface Block {
  name: string;
  x: number;
  y: number;
  z?: number;
  entities: Entity[];
}

/**
 * Layout definition
 */
export interface Layout {
  name: string;
  [key: string]: any;
}

/**
 * Objects section containing layouts
 */
export interface Objects {
  layouts: Layout[];
}

/**
 * Header section with DXF variables
 */
export interface Header {
  [key: string]: any;
}

/**
 * Complete parsed DXF structure
 */
export interface ParsedDXF {
  header: Header;
  tables: Tables;
  blocks: Block[];
  entities: Entity[];
  objects: Objects;
}

/**
 * Polyline with color information for rendering
 */
export interface ColoredPolyline {
  rgb: RGBColor;
  layer: Layer | undefined;
  vertices: Array<[number, number]>;
}

/**
 * Result of toPolylines conversion
 */
export interface PolylinesResult {
  bbox: any; // Box2 from vecks library
  polylines: ColoredPolyline[];
}

/**
 * Entities grouped by layer name
 */
export type GroupedEntities = Record<string, Entity[]>;
