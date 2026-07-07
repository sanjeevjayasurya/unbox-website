import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const LazyMathBlock = ({ math }) => <BlockMath math={math} />;

export default LazyMathBlock;
