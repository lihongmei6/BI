import Loading from "../components/ChartLoading.vue";
import createLoadingLikeDirective from "@/utils/create-loading-like-directive";

const loadingDirective = createLoadingLikeDirective(Loading);

export default loadingDirective;
