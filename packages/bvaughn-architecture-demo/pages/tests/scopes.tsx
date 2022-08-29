import { NamedValue } from "@replayio/protocol";
import Inspector from "@bvaughn/components/inspector";
import Initializer from "@bvaughn/components/Initializer";
import Loader from "@bvaughn/components/Loader";
import usePreferredColorScheme from "@bvaughn/src/hooks/usePreferredColorScheme";
import { Suspense } from "react";
import { ReplayClientContext } from "shared/client/ReplayClientContext";
import { createReplayClientForPlaywrightTesting } from "shared/utils/client";
import { getFlag } from "shared/utils/url";

import styles from "./styles.module.css";
import { evaluate, getPauseForExecutionPoint } from "@bvaughn/src/suspense/PauseCache";
import { getClosestPointForTime } from "@bvaughn/src/suspense/PointsCache";

export default function Scopes() {
  usePreferredColorScheme();

  return (
    <ReplayClientContext.Provider value={replayClient}>
      <Initializer accessToken={ACCESS_TOKEN} recordingId={RECORDING_ID}>
        <div className={styles.Grid1Column}>
          <div className={styles.VerticalContainer}>
            <Suspense fallback={<Loader />}>
              <Suspender />
            </Suspense>
          </div>
        </div>
      </Initializer>
    </ReplayClientContext.Provider>
  );
}

function Suspender() {
  const point = getClosestPointForTime(replayClient, 1000);
  const { pauseId } = getPauseForExecutionPoint(replayClient, point);
  const { returned } = evaluate(replayClient, pauseId, null, "globalValues");

  const namedValue: NamedValue = {
    name: "globalValues",
    ...returned,
  };

  return <Inspector context="default" pauseId={pauseId} protocolValue={namedValue} />;
}

// The data below this line was auto-generated using the createReplayClientRecorder().
// To re-record it, append a "record" parameter to the player URL.

const ACCESS_TOKEN = null;
const RECORDING_ID = getFlag("recordingId") || "bd42974e-7751-4179-b114-53b3d2779778";
const replayClient = createReplayClientForPlaywrightTesting(
  `[{"args":["bd42974e-7751-4179-b114-53b3d2779778",null],"isAsync":true,"isGetter":false,"prop":"initialize","result":"bcbbde77-443a-46ff-b3f9-acf74a0681e4/4a8d5be2-9d1e-49f2-b1cf-9fc579afc1f5","thennable":{}},{"args":["bcbbde77-443a-46ff-b3f9-acf74a0681e4/4a8d5be2-9d1e-49f2-b1cf-9fc579afc1f5"],"isAsync":true,"isGetter":false,"prop":"getSessionEndpoint","result":{"point":"3569704090242783922492075560402944","time":1495},"thennable":{}},{"args":[],"isAsync":true,"isGetter":false,"prop":"findSources","result":[{"sourceId":"h1","kind":"html","url":"file:///Users/bvaughn/Documents/git/replay/devtools/packages/bvaughn-architecture-demo/playwright/fixtures/scopes.html","generatedSourceIds":["1"],"contentHash":"2706b54e9b376d993db23c673b17718faa4df6bfdcc6dd4a7bf2f28887216095"},{"sourceId":"1","kind":"inlineScript","url":"file:///Users/bvaughn/Documents/git/replay/devtools/packages/bvaughn-architecture-demo/playwright/fixtures/scopes.html","contentHash":"2174ea0420809c0c5f3821703a90020289018570b5ed6b21105420867e544af9"}],"thennable":{}},{"args":[1000],"isAsync":true,"isGetter":false,"prop":"getPointNearTime","result":{"point":"2596148429267487601241543002816571","time":995},"thennable":{}},{"args":["2596148429267487601241543002816571"],"isAsync":true,"isGetter":false,"prop":"createPause","result":{"pauseId":"ce2789c4-099b-47df-be93-a26484c3981c","stack":[],"data":{}},"thennable":{}},{"args":["ce2789c4-099b-47df-be93-a26484c3981c","globalValues",null],"isAsync":true,"isGetter":false,"prop":"evaluateExpression","result":{"data":{"objects":[{"className":"Object","objectId":"1","preview":{"properties":[{"name":"array","object":"3"},{"name":"arrayWithNesting","object":"4"},{"name":"object","object":"5"},{"name":"objectWithNesting","object":"6"}],"prototypeId":"2"}},{"className":"Object","objectId":"2","preview":{"properties":[{"flags":3,"name":"toString","object":"8"},{"flags":3,"name":"toLocaleString","object":"9"},{"flags":3,"name":"valueOf","object":"10"},{"flags":3,"name":"hasOwnProperty","object":"11"},{"flags":3,"name":"isPrototypeOf","object":"12"},{"flags":3,"name":"propertyIsEnumerable","object":"13"},{"flags":3,"name":"__defineGetter__","object":"14"},{"flags":3,"name":"__defineSetter__","object":"15"},{"flags":3,"name":"__lookupGetter__","object":"16"},{"flags":3,"name":"__lookupSetter__","object":"17"},{"flags":2,"get":"18","name":"__proto__","set":"19"},{"flags":3,"name":"constructor","object":"20"}]}},{"className":"Array","objectId":"3","preview":{"getterValues":[{"name":"length","value":3}],"properties":[{"name":"0","value":123},{"name":"1","value":"abc"},{"name":"2","value":true},{"flags":1,"name":"length","value":3}],"prototypeId":"7"}},{"className":"Array","objectId":"7","preview":{"getterValues":[{"name":"length"}],"properties":[{"flags":1,"name":"length","value":0},{"flags":3,"name":"toString","object":"33"},{"flags":3,"name":"toLocaleString","object":"34"},{"flags":3,"name":"join","object":"35"},{"flags":3,"name":"reverse","object":"36"},{"flags":3,"name":"sort","object":"37"},{"flags":3,"name":"push","object":"38"},{"flags":3,"name":"pop","object":"39"},{"flags":3,"name":"shift","object":"40"},{"flags":3,"name":"unshift","object":"41"},{"flags":3,"name":"splice","object":"42"},{"flags":3,"name":"concat","object":"43"},{"flags":3,"name":"slice","object":"44"},{"flags":3,"name":"lastIndexOf","object":"45"},{"flags":3,"name":"indexOf","object":"46"},{"flags":3,"name":"forEach","object":"47"},{"flags":3,"name":"map","object":"48"},{"flags":3,"name":"filter","object":"49"},{"flags":3,"name":"reduce","object":"50"},{"flags":3,"name":"reduceRight","object":"51"},{"flags":3,"name":"some","object":"52"},{"flags":3,"name":"every","object":"53"},{"flags":3,"name":"find","object":"54"},{"flags":3,"name":"findIndex","object":"55"},{"flags":3,"name":"copyWithin","object":"56"},{"flags":3,"name":"fill","object":"57"},{"flags":3,"name":"entries","object":"58"},{"flags":3,"name":"keys","object":"59"},{"flags":3,"name":"values","object":"60"},{"flags":3,"name":"includes","object":"61"},{"flags":3,"name":"flatMap","object":"62"},{"flags":3,"name":"flat","object":"63"},{"flags":3,"name":"at","object":"64"},{"flags":3,"name":"constructor","object":"65"},{"flags":3,"isSymbol":true,"name":"Symbol(Symbol.iterator)","object":"60"},{"flags":2,"isSymbol":true,"name":"Symbol(Symbol.unscopables)","object":"66"}],"prototypeId":"2"}},{"className":"Array","objectId":"4","preview":{"getterValues":[{"name":"length","value":4}],"properties":[{"name":"0","value":123},{"name":"1","object":"3"},{"name":"2","object":"5"},{"name":"3","object":"6"},{"flags":1,"name":"length","value":4}],"prototypeId":"7"}},{"className":"Object","objectId":"5","preview":{"properties":[{"name":"foo","value":123},{"name":"bar","value":"abc"},{"name":"baz","value":true}],"prototypeId":"2"}},{"className":"Object","objectId":"6","preview":{"properties":[{"name":"foo","value":123},{"name":"object","object":"5"},{"name":"array","object":"3"},{"name":"arrayWithNesting","object":"4"}],"prototypeId":"2"}},{"className":"Function","objectId":"8","preview":{"functionName":"toString","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"toString"}],"prototypeId":"21"}},{"className":"Function","objectId":"21"},{"className":"Function","objectId":"9","preview":{"functionName":"toLocaleString","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"toLocaleString"}],"prototypeId":"21"}},{"className":"Function","objectId":"10","preview":{"functionName":"valueOf","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"valueOf"}],"prototypeId":"21"}},{"className":"Function","objectId":"11","preview":{"functionName":"hasOwnProperty","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"hasOwnProperty"}],"prototypeId":"21"}},{"className":"Function","objectId":"12","preview":{"functionName":"isPrototypeOf","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"isPrototypeOf"}],"prototypeId":"21"}},{"className":"Function","objectId":"13","preview":{"functionName":"propertyIsEnumerable","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"propertyIsEnumerable"}],"prototypeId":"21"}},{"className":"Function","objectId":"14","preview":{"functionName":"__defineGetter__","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":2},{"flags":2,"name":"name","value":"__defineGetter__"}],"prototypeId":"21"}},{"className":"Function","objectId":"15","preview":{"functionName":"__defineSetter__","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":2},{"flags":2,"name":"name","value":"__defineSetter__"}],"prototypeId":"21"}},{"className":"Function","objectId":"16","preview":{"functionName":"__lookupGetter__","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"__lookupGetter__"}],"prototypeId":"21"}},{"className":"Function","objectId":"17","preview":{"functionName":"__lookupSetter__","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"__lookupSetter__"}],"prototypeId":"21"}},{"className":"Function","objectId":"18","preview":{"functionName":"get __proto__","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"get __proto__"}],"prototypeId":"21"}},{"className":"Function","objectId":"19","preview":{"functionName":"set __proto__","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"set __proto__"}],"prototypeId":"21"}},{"className":"Function","objectId":"20","preview":{"functionName":"Object","functionParameterNames":[],"getterValues":[],"overflow":true,"properties":[{"flags":3,"name":"assign","object":"22"},{"flags":3,"name":"getPrototypeOf","object":"23"},{"flags":3,"name":"setPrototypeOf","object":"24"},{"flags":3,"name":"getOwnPropertyDescriptor","object":"25"},{"flags":3,"name":"getOwnPropertyDescriptors","object":"26"},{"flags":3,"name":"keys","object":"27"},{"flags":3,"name":"values","object":"28"},{"flags":3,"name":"entries","object":"29"},{"flags":3,"name":"is","object":"30"},{"flags":3,"name":"defineProperty","object":"31"}],"prototypeId":"21"}},{"className":"Function","objectId":"22"},{"className":"Function","objectId":"23"},{"className":"Function","objectId":"24"},{"className":"Function","objectId":"25"},{"className":"Function","objectId":"26"},{"className":"Function","objectId":"27"},{"className":"Function","objectId":"28"},{"className":"Function","objectId":"29"},{"className":"Function","objectId":"30"},{"className":"Function","objectId":"31"},{"className":"Function","objectId":"33","preview":{"functionName":"toString","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"toString"}],"prototypeId":"21"}},{"className":"Function","objectId":"34","preview":{"functionName":"toLocaleString","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"toLocaleString"}],"prototypeId":"21"}},{"className":"Function","objectId":"35","preview":{"functionName":"join","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"join"}],"prototypeId":"21"}},{"className":"Function","objectId":"36","preview":{"functionName":"reverse","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"reverse"}],"prototypeId":"21"}},{"className":"Function","objectId":"37","preview":{"functionName":"sort","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"sort"}],"prototypeId":"21"}},{"className":"Function","objectId":"38","preview":{"functionName":"push","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"push"}],"prototypeId":"21"}},{"className":"Function","objectId":"39","preview":{"functionName":"pop","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"pop"}],"prototypeId":"21"}},{"className":"Function","objectId":"40","preview":{"functionName":"shift","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"shift"}],"prototypeId":"21"}},{"className":"Function","objectId":"41","preview":{"functionName":"unshift","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"unshift"}],"prototypeId":"21"}},{"className":"Function","objectId":"42","preview":{"functionName":"splice","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":2},{"flags":2,"name":"name","value":"splice"}],"prototypeId":"21"}},{"className":"Function","objectId":"43","preview":{"functionName":"concat","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"concat"}],"prototypeId":"21"}},{"className":"Function","objectId":"44","preview":{"functionName":"slice","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":2},{"flags":2,"name":"name","value":"slice"}],"prototypeId":"21"}},{"className":"Function","objectId":"45","preview":{"functionName":"lastIndexOf","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"lastIndexOf"}],"prototypeId":"21"}},{"className":"Function","objectId":"46","preview":{"functionName":"indexOf","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"indexOf"}],"prototypeId":"21"}},{"className":"Function","objectId":"47","preview":{"functionName":"forEach","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"forEach"}],"prototypeId":"21"}},{"className":"Function","objectId":"48","preview":{"functionName":"map","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"map"}],"prototypeId":"21"}},{"className":"Function","objectId":"49","preview":{"functionName":"filter","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"filter"}],"prototypeId":"21"}},{"className":"Function","objectId":"50","preview":{"functionName":"reduce","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"reduce"}],"prototypeId":"21"}},{"className":"Function","objectId":"51","preview":{"functionName":"reduceRight","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"reduceRight"}],"prototypeId":"21"}},{"className":"Function","objectId":"52","preview":{"functionName":"some","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"some"}],"prototypeId":"21"}},{"className":"Function","objectId":"53","preview":{"functionName":"every","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"every"}],"prototypeId":"21"}},{"className":"Function","objectId":"54","preview":{"functionName":"find","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"find"}],"prototypeId":"21"}},{"className":"Function","objectId":"55","preview":{"functionName":"findIndex","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"findIndex"}],"prototypeId":"21"}},{"className":"Function","objectId":"56","preview":{"functionName":"copyWithin","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":2},{"flags":2,"name":"name","value":"copyWithin"}],"prototypeId":"21"}},{"className":"Function","objectId":"57","preview":{"functionName":"fill","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"fill"}],"prototypeId":"21"}},{"className":"Function","objectId":"58","preview":{"functionName":"entries","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"entries"}],"prototypeId":"21"}},{"className":"Function","objectId":"59","preview":{"functionName":"keys","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"keys"}],"prototypeId":"21"}},{"className":"Function","objectId":"60","preview":{"functionName":"values","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"values"}],"prototypeId":"21"}},{"className":"Function","objectId":"61","preview":{"functionName":"includes","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"includes"}],"prototypeId":"21"}},{"className":"Function","objectId":"62","preview":{"functionName":"flatMap","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"flatMap"}],"prototypeId":"21"}},{"className":"Function","objectId":"63","preview":{"functionName":"flat","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":0},{"flags":2,"name":"name","value":"flat"}],"prototypeId":"21"}},{"className":"Function","objectId":"64","preview":{"functionName":"at","functionParameterNames":[],"getterValues":[],"properties":[{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"at"}],"prototypeId":"21"}},{"className":"Function","objectId":"65","preview":{"functionName":"Array","functionParameterNames":[],"getterValues":[],"properties":[{"flags":3,"name":"isArray","object":"67"},{"flags":3,"name":"from","object":"68"},{"flags":3,"name":"of","object":"69"},{"flags":0,"name":"prototype","object":"7"},{"flags":2,"name":"length","value":1},{"flags":2,"name":"name","value":"Array"},{"flags":2,"get":"70","isSymbol":true,"name":"Symbol(Symbol.species)"}],"prototypeId":"21"}},{"className":"Function","objectId":"67"},{"className":"Function","objectId":"68"},{"className":"Function","objectId":"69"},{"className":"Function","objectId":"70"},{"className":"Object","objectId":"66","preview":{"overflow":true,"properties":[{"name":"at","value":true},{"name":"copyWithin","value":true},{"name":"entries","value":true},{"name":"fill","value":true},{"name":"find","value":true},{"name":"findIndex","value":true},{"name":"flat","value":true},{"name":"flatMap","value":true},{"name":"includes","value":true},{"name":"keys","value":true}]}}]},"returned":{"object":"1"}},"thennable":{}}]`
);