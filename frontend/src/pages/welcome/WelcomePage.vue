<template>
  <q-page padding class="row">
    <!-- Section pour les informations générales -->
    <div class="col-12 row flex flex-center q-mb-md">
      <q-card class="q-mt-md col-xs-12 col-md-10">
        <q-card-section class="q-pa-md">
          <p class="text-h5">Le meilleur de l'actualité</p>

          <div class="q-pa-md">
            <q-carousel
              animated
              v-model="slide"
              navigation
              infinite
              :autoplay="autoplay"
              swipeable
              prev-icon="arrow_left"
              next-icon="arrow_right"
              arrows
              transition-prev="slide-right"
              transition-next="slide-left"
            >
              <q-carousel-slide
                name="first"
                img-src="https://cdn.pixabay.com/photo/2017/01/25/12/31/bitcoin-2007769_1280.jpg"
              >
                <div class="absolute-top custom-caption">
                  <div class="text-h5">Bitcoin crash !</div>
                  <div class="text-subtitle1">
                    Bitcoin a touché les les 65000 dollars ce weekend , est ce
                    la fin du bull market ?
                  </div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="second"
                img-src="https://cdn.pixabay.com/photo/2021/12/06/14/54/non-fungible-token-6850539_1280.jpg"
              >
                <div class="absolute-top custom-caption">
                  <div class="text-h5">NFT , une industrie sous-cotée ?</div>
                  <div class="text-subtitle1">
                    Selon plusieurs spécialistes, les NFT vont exploser sous peu
                    !
                  </div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="third"
                img-src="https://ts2.space/wp-content/uploads/2023/10/What-is-the-negative-future-of-AI_652b3ac1ca45a.jpg"
              >
                <div class="absolute-top custom-caption">
                  <div class="text-h5">Pourquoi l'IA explose ?</div>
                  <div class="text-subtitle1">
                    Le cours des actifs basés sur de l'IA a explosé, et ce n'est
                    que le début ...
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- Section pour la liste des plateformes supportées -->
    <div class="col-12 row flex flex-center">
      <q-card class="col-xs-12 col-md-10">
        <q-card-section class="q-pa-md">
          <h2 class="text-h6">Plateformes supportées</h2>
          <q-virtual-scroll
            :items="platformListSupported"
            virtual-scroll-horizontal
            v-slot="{ item, index }"
            class="flex flex-center"
          >
            <div :key="index" class="row items-center">
              <q-avatar
                v-if="item.avatar === true"
                class="bg-black text-white q-my-md"
              >
                {{ index % 10 }}
              </q-avatar>

              <q-item v-else dense clickable>
                <q-item-section>
                  <q-item-label>
                    <q-avatar
                      rounded
                      style="border: solid 1px grey"
                      size="100px"
                      font-size="82px"
                      color="white"
                      text-color="white"
                    >
                      <q-img :src="item.icon_link" style="position: relative">
                      </q-img>
                    </q-avatar>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator vertical spaced />
            </div>
          </q-virtual-scroll>
        </q-card-section>
      </q-card>
    </div>

    <!-- Section pour la roadmap et les projets -->
    <div class="col-12 row flex flex-center">
      <q-card class="q-mt-md col-xs-12 col-md-10">
        <q-card-section class="q-pa-md">
          <p class="text-h6">Roadmap et Projets</p>
          <q-scroll-area style="height: 250px">
            <div class="row flex-center felx">
              <q-timeline :side="side" color="secondary" class="col-6">
                <q-timeline-entry
                  v-for="item in roadmapList"
                  :key="item"
                  :title="item.title"
                  :subtitle="item.date"
                  :side="item.side"
                  :icon="item.icon"
                >
                  <q-expansion-item
                    icon="explore"
                    :label="item.subtitle"
                    :style="{ width: $q.screen.width > 300 ? '50vw' : '100vw' }"
                    class="bg-primary"
                  >
                    <q-card>
                      <q-card-section>
                        {{ item.content }}
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-timeline-entry>
              </q-timeline>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>

    <!-- Section pour la roadmap et les projets -->
    <div class="col-12 row flex flex-center q-mb-md">
      <q-card class="q-mt-md col-xs-12 col-md-10">
        <q-card-section class="q-pa-md">
          <p class="text-h5">Découvrir notre équipe</p>
          <div
            class="q-pa-md q-gutter-sm flex flex-center"
            style="height: 200px"
          >
            <q-avatar
              v-for="n in 5"
              :key="n"
              size="150px"
              class="overlapping"
              :style="`left: ${n * 100}px`"
            >
              <img :src="`https://cdn.quasar.dev/img/avatar${n + 0}.jpg`" />
            </q-avatar>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "WelcomePage",

  setup() {
    // Info général :
    const slide = ref(1);
    const autoplay = ref(true);

    // roadmap
    const roadmapList = ref([
      {
        title: "first event",
        subtitle: "First event with more detail",
        content: "blablablablablablabla",
        date: "April 1st, 2024",
        side: "right",
        icon: "star",
      },
      {
        title: "Second event",
        subtitle: "Subtitle",
        content: "blablablablablablabla",
        date: "June 1st, 2024",
        side: "left",
        icon: "delete",
      },
      {
        title: "Third event",
        subtitle: "Subtitle",
        content: "blablablablablablabla",
        date: "September 1st, 2024",
        side: "right",
        icon: "mdi-plus",
      },
    ]);
    const layout = ref("loose");
    const side = ref("right");

    const router = useRouter();
    const url = `http://localhost:${process.env.GATEWAY_PORT}`;
    const platformListSupported = ref([]);

    const getPlatformList = async () => {
      const temp = await axios.get(`${url}/platformlistpublic`, {});

      return temp;
    };

    onMounted(async () => {
      const temp = await getPlatformList();

      platformListSupported.value = temp.data.data;
      console.log(temp.data.data);
    });

    return {
      platformListSupported,
      slide,
      autoplay,
      layout,
      side,
      roadmapList,
    };
  },
});
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .5)

.overlapping
  border: 2px solid white
  position: absolute
</style>
