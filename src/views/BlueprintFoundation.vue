<template>
  <PageHeader />
  <div>
    <div class="page-content">
      <div
        class="
          flex
          justify-between
          md:justify-center
          gap-[50px]
          md:gap-[150px]
          lg:gap-[140px]
          xl:gap-[235px]
          3xl:gap-[500px]
          2xl:mt-20
          3xl:mt-24
        "
      >
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 405.26 405.095"
            class="
              transition-all
              duration-700
              ease-in-out
              w-[300px]
              h-[300px]
              flex-1
              md:flex-auto
              lg:w-[370.26px] lg:h-[370.095px]
              xl:w-[405.26px] xl:h-[405.095px]
              3xl:w-[500px] 3xl:h-[500px]
              mt-8
              ml-9
              lg:mt-0 lg:ml-0
            "
            :style="`transform: rotate(${rotateDeg}deg);`"
          >
            <g
              @click="changeTab('personal')"
              :class="[
                'cursor-pointer transition-all duration-700 ease-in-out',
              ]"
              transform="translate(0 45.277)"
            >
              <path
                d="M450.717,384.755H351.36a6.08,6.08,0,0,1-5.835-4.277,202.966,202.966,0,0,1,64.563-214.829,6.107,6.107,0,0,1,9.686,2.874l32.547,101.271a6.179,6.179,0,0,1-.472,4.821,99.474,99.474,0,0,0,4,100.719A6.105,6.105,0,0,1,450.717,384.755Z"
                transform="translate(-336.843 -164.259)"
                fill="#ffd048"
              />
            </g>
            <g
              @click="changeTab('application-process')"
              :class="[
                'cursor-pointer transition-all duration-700 ease-in-out',
              ]"
              transform="translate(87.847)"
            >
              <path
                d="M629.255,173.023,545.922,234.8a6.194,6.194,0,0,1-5.113,1.02,99.56,99.56,0,0,0-96.815,30.55,6.1,6.1,0,0,1-10.349-2.226l-30.022-93.42a6.15,6.15,0,0,1,2.48-7,202.749,202.749,0,0,1,222.918-.7A6.107,6.107,0,0,1,629.255,173.023Z"
                transform="translate(-403.33 -129.991)"
                fill="#196499"
              />
            </g>
            <g
              @click="changeTab('financials')"
              :class="[
                'cursor-pointer transition-all duration-700 ease-in-out',
              ]"
              transform="translate(209.367 213.108)"
            >
              <path
                d="M676.564,356.486A202.718,202.718,0,0,1,501.754,483.009a6.106,6.106,0,0,1-6.143-8.015l33.133-101.141a6.187,6.187,0,0,1,3.2-3.622,99.524,99.524,0,0,0,54.779-73.823,6.1,6.1,0,0,1,9.62-3.955L674.5,349.2A6.147,6.147,0,0,1,676.564,356.486Z"
                transform="translate(-495.302 -291.281)"
                fill="#a6c6dc"
              />
            </g>
            <g
              @click="changeTab('business-credit-report')"
              :class="[
                'cursor-pointer transition-all duration-700 ease-in-out',
              ]"
              transform="translate(15.622 273.421)"
            >
              <g transform="translate(0 0)">
                <path
                  d="M563.911,371.133,533.35,464.391a6.148,6.148,0,0,1-6.127,4.207A202.7,202.7,0,0,1,349.168,345.49a6.131,6.131,0,0,1,5.614-8.561h108.7a6.166,6.166,0,0,1,4.22,1.7,99.58,99.58,0,0,0,89.108,24.63A6.107,6.107,0,0,1,563.911,371.133Z"
                  transform="translate(-348.666 -336.929)"
                  fill="#e49a17"
                />
              </g>
            </g>
            <g
              @click="changeTab('foundation')"
              :class="[
                'cursor-pointer transition-all duration-700 ease-in-out',
              ]"
              transform="translate(243.172 44.32)"
            >
              <path
                d="M682.975,321.845a202.713,202.713,0,0,1-7.679,55.406,6.111,6.111,0,0,1-9.468,3.224L582.01,319.593a6.2,6.2,0,0,1-2.51-4.618,99.429,99.429,0,0,0-55.253-82.34,6.1,6.1,0,0,1-.879-10.364L601,164.731a6.149,6.149,0,0,1,7.563.214A202.234,202.234,0,0,1,682.975,321.845Z"
                transform="translate(-520.887 -163.534)"
                fill="#0cae87"
              />
            </g>
            <path
              class="pointer-events-none"
              d="M268.092,431.57c-.1-.032-.2-.065-.294-.1l.284-1.614a5.862,5.862,0,0,0,3.015.2c1.59-.34,2.105-1.1,1.937-1.874-.213-.984-1.5-.976-2.928-1.009-1.751-.042-3.713-.149-4.163-2.228-.355-1.646.68-3.343,3.506-3.947a6.8,6.8,0,0,1,4.33.368l-.342,1.624a5.863,5.863,0,0,0-3.644-.4c-1.606.343-2.159,1.06-1.993,1.824.215,1,1.5.988,2.937,1.022,1.755.044,3.721.151,4.177,2.255.358,1.661-.662,3.354-3.488,3.958a7.576,7.576,0,0,1-1.569.165A6.106,6.106,0,0,1,268.092,431.57Zm12.155-11.417-5.3,1.49-.452-1.591,7.188-2.021,2.872,10.127-1.884.528Zm3.091-2.554,1.926-.69,1.82,1.937,4.958-1.775.151-2.641,1.9-.68-.892,11.5-1.814.649Zm4.874,2.471,3.432,3.659.3-4.993Zm-95.691,3.077c-.269-.078-.521-.166-.756-.26-1.878-.759-2.627-2.025-2.215-3.45a2.522,2.522,0,0,1,1.945-1.845,2.592,2.592,0,0,1-1.1-3.039c.5-1.732,2.154-2.347,4.758-1.592l5.034,1.461-2.925,10.1Zm-1.005-3.4c-.271.938.333,1.614,1.635,1.991l2.661.773.806-2.785-2.662-.772a3.8,3.8,0,0,0-1.045-.17A1.3,1.3,0,0,0,191.516,419.743Zm.725-4.452c-.292,1.01.346,1.68,1.762,2.092l3.038.881.844-2.915-3.038-.881a4.294,4.294,0,0,0-1.172-.195A1.335,1.335,0,0,0,192.24,415.291Zm103.425-2.3,1.8-.76,4.119,9.688-1.8.76Zm-112.28,7.192,2.074-5.482c.765-2.023.178-3.242-1.414-3.843s-2.824-.072-3.589,1.951l-2.072,5.482-1.8-.682,2.1-5.552c1.084-2.866,3.294-3.814,5.985-2.8,2.706,1.024,3.737,3.2,2.653,6.064l-2.1,5.552Zm120.605-.6a4.776,4.776,0,0,1-.491-.18l.611-1.622a3.7,3.7,0,0,0,3.072-.127,3.7,3.7,0,1,0-3.263-6.643,3.652,3.652,0,0,0-1.978,2.355l-1.666-.526a5.544,5.544,0,1,1,7.745,6.314,5.946,5.946,0,0,1-2.608.639A4.849,4.849,0,0,1,303.991,419.586Zm-133.908-4.73c-.123-.049-.248-.1-.375-.163a6.673,6.673,0,0,1-2.793-2.32l1.2-1.117a5.863,5.863,0,0,0,2.29,1.972c1.476.684,2.343.39,2.678-.332.941-2.031-5.342-3.337-3.719-6.84.707-1.526,2.558-2.258,5.181-1.042a6.8,6.8,0,0,1,3.241,2.893L176.531,409a5.848,5.848,0,0,0-2.67-2.511c-1.49-.69-2.364-.451-2.694.258-.953,2.057,5.358,3.343,3.714,6.886a2.869,2.869,0,0,1-2.745,1.671A5.519,5.519,0,0,1,170.083,414.856Zm140.46-8.928,1.386-.818,8.642,3.18-3.641-6.131,1.67-.986,5.378,9.055-1.386.817-8.642-3.18L317.591,414l-1.671.986Zm-148.605,4.734,4.891-9.312,1.734.91-4.891,9.313Zm-4.787-2.624-1.3-9.1-3.681,6.1-1.664-1,5.436-9.005,1.382.832,1.3,9.1,3.681-6.1,1.665,1-5.437,9.006Zm162.915-7.762,1.672-1.178,2.27,1.384,4.3-3.031-.561-2.587,1.648-1.16,2.214,11.325-1.573,1.109Zm5.359,1.086,4.283,2.615-1.049-4.892Zm-184.533-4.038.952-1.334,4.674,3.331,1.589-2.226-4.145-2.954.934-1.309,4.145,2.954,1.687-2.36-4.846-3.452.952-1.333,6.439,4.588-6.114,8.559Zm189.817-4.764,1.533-1.214,6.559,8.247-1.533,1.214Zm4.055-3.193,1.2-1.071,9.092,1.45-4.762-5.313,1.448-1.291,7.032,7.846-1.2,1.07-9.092-1.45,4.762,5.314-1.447,1.292Zm-197.836,4.676a6.453,6.453,0,0,1-1.656-1.017,6.677,6.677,0,0,1-2.12-2.945l1.441-.78a5.871,5.871,0,0,0,1.723,2.482c1.257,1.03,2.171.964,2.677.349,1.423-1.729-4.335-4.568-1.88-7.549,1.069-1.3,3.046-1.544,5.281.29a6.791,6.791,0,0,1,2.409,3.611l-1.488.743a5.843,5.843,0,0,0-1.953-3.1c-1.27-1.04-2.178-1.028-2.674-.424-1.443,1.75,4.345,4.577,1.863,7.593a2.785,2.785,0,0,1-2.2,1.045A3.8,3.8,0,0,1,136.928,394.043Zm37.03-2.277c-2.426-1.329-3.248-3.392-2.122-5.436a3.379,3.379,0,0,1,3.571-1.837l-.454-4.195,1.847,1.011.4,3.737a3.258,3.258,0,0,1,.364.182l2.083,1.141,1.483-2.689,1.715.939-5.085,9.229Zm.577-5.424a2.039,2.039,0,0,0-.971.934c-.639,1.161-.23,2.259,1.273,3.083l2.006,1.1,2.026-3.677-2.005-1.1a3.4,3.4,0,0,0-1.6-.48A1.843,1.843,0,0,0,174.534,386.342ZM344,380.853l1.379-1.385,7.486,7.416-1.379,1.386Zm-183.252,2.862.894-1.376,4.812,3.108,1.491-2.3-4.27-2.758.878-1.35,4.269,2.757,1.582-2.437-4.99-3.221.893-1.375,6.632,4.281-5.736,8.837ZM129.213,387.3a6.13,6.13,0,0,1-1.862-1.246,6.66,6.66,0,0,1-1.922-3.078l1.49-.684a5.855,5.855,0,0,0,1.554,2.59c1.187,1.112,2.1,1.106,2.649.526,1.535-1.632-4.025-4.844-1.378-7.658,1.153-1.226,3.141-1.339,5.251.637a6.789,6.789,0,0,1,2.168,3.763l-1.535.642a5.837,5.837,0,0,0-1.746-3.221c-1.2-1.123-2.1-1.17-2.641-.6-1.554,1.653,4.036,4.854,1.359,7.7a2.783,2.783,0,0,1-2.063.9A3.537,3.537,0,0,1,129.213,387.3Zm224.423-3.5,3.828-4.259-2.389-2.138-3.4,3.778-1.234-1.105,3.4-3.778-3.006-2.691,1.3-1.453,7.853,7.029-5.134,5.711Zm-199.245-4.724c-2.209-1.665-2.723-3.825-1.313-5.685s3.632-1.957,5.84-.291l1.9,1.429,1.837-2.424,1.56,1.176-6.362,8.4Zm1.114-5.2a2.133,2.133,0,0,0-.856.7c-.8,1.056-.554,2.2.814,3.235l1.826,1.375,2.526-3.336-1.825-1.375a3.094,3.094,0,0,0-1.81-.734A1.711,1.711,0,0,0,155.506,373.882Zm-37.443,1.743a6.127,6.127,0,0,1-2.309-1.676,5.33,5.33,0,0,1-1.41-4.3l1.728.175a3.692,3.692,0,0,0,.918,2.931,3.7,3.7,0,1,0,5.586-4.847,3.673,3.673,0,0,0-2.793-1.3l.078-1.741a5.575,5.575,0,0,1,.177,11.148A5.267,5.267,0,0,1,118.063,375.625Zm26.391-4.518a5.426,5.426,0,1,1,7.844-.269,5.509,5.509,0,0,1-1.95,1.412,5.154,5.154,0,0,1-2.018.41A5.832,5.832,0,0,1,144.454,371.107Zm2.237-7.506a3.9,3.9,0,0,0-1.384,1.007,3.7,3.7,0,1,0,5.23-.3,3.724,3.724,0,0,0-2.482-.985A3.482,3.482,0,0,0,146.691,363.6Zm-38.052,1.225c-1.656-2.22-1.548-4.438.324-5.827a3.373,3.373,0,0,1,4.008-.183l1.327-4,1.26,1.689-1.187,3.563a3.781,3.781,0,0,1,.256.317l1.421,1.906,2.463-1.829,1.17,1.568-8.449,6.274Zm1.5-4.246c-1.062.787-1.147,1.957-.121,3.332l1.369,1.834,3.368-2.5-1.369-1.833a3.3,3.3,0,0,0-1.346-1.143,1.8,1.8,0,0,0-.678-.136A2.043,2.043,0,0,0,110.141,360.58ZM135,361.747c-1.908-2-2.064-4.217-.371-5.825a3.378,3.378,0,0,1,3.958-.671l.842-4.136,1.452,1.523-.757,3.683a3.457,3.457,0,0,1,.292.283l1.638,1.719,2.228-2.115,1.349,1.415-7.645,7.258Zm1.673-4.863a2.326,2.326,0,0,0-.686.464c-.961.913-.906,2.083.276,3.325l1.575,1.653,3.047-2.894-1.577-1.653a2.8,2.8,0,0,0-1.953-1.036A1.738,1.738,0,0,0,136.674,356.884Zm-36.716-4.892,1.383-.879,3.088,4.833,2.309-1.468L104,350.191l1.358-.863,2.739,4.288,2.451-1.557-3.2-5.01,1.383-.878,4.254,6.659-8.884,5.645Zm25.081-1.7,1.276-1.057,2.226,2.685,6.85-5.663,1.246,1.5-6.849,5.662,2.226,2.684-1.277,1.057ZM95.95,344.849c-1.611-3.011-.852-6.056,1.936-7.538s5.747-.415,7.358,2.6l2.172,4.059-9.294,4.943Zm2.866-5.8c-1.925,1.023-2.47,3.034-1.363,5.1l1.207,2.255,6.373-3.389-1.206-2.255a4.108,4.108,0,0,0-2.032-1.955,3.176,3.176,0,0,0-1.2-.232A3.793,3.793,0,0,0,98.816,339.049Zm-7.647-3.861,9.574-4.382.819,1.777-9.574,4.382Zm-4.361-10.426,1.535-.616,1.307,3.236,8.24-3.3.733,1.814-8.24,3.3,1.306,3.236-1.536.616Zm308.469-38.6.09-1.606,7.456-5.393-7.13-.4.108-1.935,10.53.589-.09,1.6-7.456,5.393,7.13.4-.108,1.936Zm.291-17.439a5.427,5.427,0,1,1,5.576,5.512l-.167,0A5.384,5.384,0,0,1,395.567,268.724Zm5.318-3.843a3.7,3.7,0,1,0,.121,0Zm-5.779-6.221,10.5-.922.172,1.946-10.5.922ZM83.771,256.434l.591-4.286c.378-2.738,2.013-4.242,4.326-3.923,2.3.317,3.481,2.208,3.1,4.946l-.324,2.352,3.014.414-.267,1.935Zm2.219-3.971-.311,2.263,4.148.571.312-2.262c.233-1.7-.407-2.679-1.72-2.86l-.139-.016q-.113-.01-.221-.01C86.946,250.149,86.2,250.929,85.991,252.464Zm317.322-.313-8.8,1.206-.266-1.935,8.8-1.206-.476-3.452,1.642-.225,1.218,8.84-1.642.225Zm-9.892-6.026L395.6,244.6l-1.064-5.151-2.6-.525-.408-1.972,11.286,2.514.39,1.884-9.369,6.772Zm3.552-2.463,4.114-2.87-4.913-1ZM85.54,244.686l1.588-7.511,1.606.338-1.184,5.6,2.683.565,1.05-4.968,1.576.332-1.049,4.968,2.845.6,1.227-5.807,1.606.338-1.631,7.717Zm2.441-10.94,1.2-4.156c.768-2.656,2.6-3.911,4.847-3.264a3.369,3.369,0,0,1,2.577,3.073l4-1.366-.584,2.021-3.563,1.209a3.675,3.675,0,0,1-.1.4l-.659,2.28,2.952.85-.542,1.876Zm2.768-3.612-.634,2.194,4.037,1.163.634-2.194c.477-1.645-.03-2.714-1.3-3.081a2.559,2.559,0,0,0-.483-.092q-.093-.008-.183-.008C91.867,228.116,91.138,228.788,90.749,230.134Zm298.959.518-1.293-4.414,10.122-2.951,1.293,4.414c.959,3.274-.41,6.1-3.446,6.986a5.728,5.728,0,0,1-1.6.237C392.435,234.923,390.494,233.334,389.708,230.651Zm.847-3,.718,2.452a3.521,3.521,0,0,0,4.557,2.695c2.1-.611,3.044-2.469,2.385-4.719l-.719-2.452Zm-291.7-2.567a5.83,5.83,0,0,0,2.288-2.859c.565-1.536.253-2.387-.482-2.657-1.037-.38-1.748.927-2.626,2.218-.931,1.371-2.051,2.724-3.944,2.031-1.6-.585-2.488-2.353-1.493-5.06a6.648,6.648,0,0,1,2.086-2.964l1.216,1.1a5.856,5.856,0,0,0-1.78,2.437c-.56,1.523-.193,2.361.555,2.635,1.023.374,1.733-.929,2.608-2.219.929-1.367,2.043-2.719,3.915-2.032,1.583.58,2.469,2.361,1.472,5.069a6.776,6.776,0,0,1-2.62,3.457ZM386.8,221.709l4.559-7.979L384.7,216.3l-.7-1.807,9.832-3.8.582,1.5-4.559,7.979,6.658-2.572.7,1.807-9.832,3.8ZM101.58,215.572a5.576,5.576,0,0,1-1.837-.491,5.671,5.671,0,1,1,7.291-2.9,5.525,5.525,0,0,1-5,3.412Q101.809,215.592,101.58,215.572Zm-2.848-7.179a3.7,3.7,0,1,0,4.91-1.823,3.979,3.979,0,0,0-1.311-.353q-.16-.014-.319-.014A3.588,3.588,0,0,0,98.733,208.392Zm281.858-.824c-1.264-2.594-.518-4.878,2.246-6.218l5.351-2.6.857,1.757-5.284,2.563c-1.951.947-2.362,2.232-1.618,3.759s2.006,1.984,3.957,1.038l5.284-2.563.843,1.73-5.351,2.6a5.709,5.709,0,0,1-2.477.635A4.205,4.205,0,0,1,380.59,207.569Zm-279.353-7.954.793-1.4,9.076-1.539-6.216-3.507.957-1.687,9.179,5.18-.794,1.4-9.076,1.541,6.214,3.507-.956,1.687Zm273.345-3.146a5.424,5.424,0,1,1,7.565,2.1,5.437,5.437,0,0,1-2.787.789A5.59,5.59,0,0,1,374.583,196.468Zm2.763-5.943a3.608,3.608,0,1,0,1.965-.56A3.843,3.843,0,0,0,377.346,190.525Zm-267.52-5.162,1.082-1.591,11.4,1.97-1.149,1.692-2.611-.495-2.956,4.352,1.438,2.225-1.132,1.666Zm4.864,4.521,2.221-3.271-4.931-.938ZM371,183.379l-3.3,2.316-1.127-1.6,8.626-6.049,4.428,6.28-1.344.942-3.3-4.683-2.625,1.84,2.929,4.154-1.355.95ZM115.107,177.91l1.209-1.536,6.989,5.477,3.4-4.322,1.3,1.021-4.613,5.858Zm168.419-28.522c-.076-.023-.15-.048-.225-.074a6.654,6.654,0,0,1-3.362-2.366l1.1-1.247a5.823,5.823,0,0,0,2.973,2.138c1.565.488,2.4.134,2.637-.612.68-2.166-5.744-2.608-4.572-6.338.51-1.621,2.236-2.6,4.994-1.737a6.661,6.661,0,0,1,3.069,1.932l-1.044,1.266a5.845,5.845,0,0,0-2.525-1.653c-1.552-.482-2.374-.077-2.612.683-.672,2.138,5.728,2.6,4.569,6.289a2.986,2.986,0,0,1-3.087,2.038A6.479,6.479,0,0,1,283.526,149.388Zm-9.472-2.609q-.379-.092-.747-.219a6.324,6.324,0,0,1-2.992-1.981l1.018-1.318a5.827,5.827,0,0,0,3.106,1.939c1.6.384,2.408-.024,2.592-.784.536-2.206-5.9-2.226-4.979-6.024.4-1.652,2.06-2.737,4.87-2.06a6.639,6.639,0,0,1,3.19,1.727l-.959,1.33a5.853,5.853,0,0,0-2.628-1.483c-1.58-.381-2.374.078-2.563.852-.529,2.177,5.889,2.222,4.974,5.978a3.064,3.064,0,0,1-3.282,2.246A6.845,6.845,0,0,1,274.054,146.779Zm-13.433-2.786,1.789-10.372,7.584,1.292-.279,1.615-5.654-.962-.466,2.7,5.017.854-.274,1.585-5.017-.853-.493,2.858,5.863,1-.279,1.615Zm-48.233-9.853,4.295-.614c2.744-.393,4.642.762,4.97,3.068s-1.174,3.948-3.918,4.342l-2.355.337.426,3.005-1.939.278Zm4.438,1.035-2.267.325.587,4.136,2.267-.325c1.7-.243,2.472-1.128,2.286-2.437a1.841,1.841,0,0,0-1.247-1.607,2.927,2.927,0,0,0-.95-.143A4.811,4.811,0,0,0,216.825,135.175Zm37.372,8.217a6.413,6.413,0,0,1-1.472-.316,5.244,5.244,0,0,1-3.6-5.609,5.709,5.709,0,0,1,10.128-2.693l-1.375,1.06a3.7,3.7,0,0,0-2.681-1.5,3.7,3.7,0,1,0-.725,7.358,3.68,3.68,0,0,0,2.925-.971l1.14,1.317a5.182,5.182,0,0,1-3.671,1.382Q254.537,143.424,254.2,143.392Zm-29.951-10.8,4.328-.291c2.765-.186,4.571,1.109,4.724,3.433a3.369,3.369,0,0,1-2.02,3.465l2.646,3.287-2.1.141-2.351-2.93a3.612,3.612,0,0,1-.4.042l-2.374.159.2,3.059-1.954.132Zm4.346,1.365-2.283.153.275,4.184,2.283-.153c1.714-.115,2.549-.955,2.462-2.274a1.841,1.841,0,0,0-1.285-1.759,3.381,3.381,0,0,0-1.1-.163Q228.775,133.94,228.593,133.952Zm12.634,8.687a6.354,6.354,0,0,1-1.98-.338,5.24,5.24,0,0,1-3.608-5.155,5.683,5.683,0,1,1,5.69,5.493Zm-3.616-5.464a3.7,3.7,0,1,0,5.014-3.428,3.991,3.991,0,0,0-1.249-.213h-.064A3.593,3.593,0,0,0,237.611,137.175Zm64.664,1.794-2.322-8.894-2.965,6.475-1.768-.808,4.379-9.563,1.466.671,2.322,8.893,2.965-6.475,1.767.808-4.379,9.562Zm-14.606-5.933-.105-.038a5.415,5.415,0,1,1,7.182-3.15,5.231,5.231,0,0,1-5.02,3.542A6.316,6.316,0,0,1,287.669,133.036Zm-1.746-6.385a3.706,3.706,0,1,0,4.743-2.212l-.066-.023a3.972,3.972,0,0,0-1.295-.222A3.565,3.565,0,0,0,285.923,126.652Zm-7.924,3.1,2.956-10.094,1.878.551-2.955,10.094ZM199.486,117.8l1.877-.436,7.037,9.172-1.994.463-1.582-2.133-5.133,1.192-.455,2.606-1.965.454Zm.5,6.614,3.856-.895-2.986-4.031Zm70.941,3.5,2.08-8.618-3.4-.821.388-1.606,8.7,2.1-.388,1.606-3.4-.821-2.079,8.618Zm-5.242-1.175-.628-2.578-5.2-.9-1.436,2.224-1.989-.344,6.454-9.562,1.9.328,2.912,11.176Zm-4.911-4.872,3.9.672-1.182-4.869Zm-52.274-6,4.286-.653c2.738-.419,4.65.719,5.007,3.021s-1.124,3.957-3.862,4.376l-2.352.358.465,3-1.935.3Zm4.45.994-2.263.345.64,4.13,2.262-.346c1.7-.258,2.457-1.15,2.255-2.457a1.848,1.848,0,0,0-1.248-1.589,2.856,2.856,0,0,0-.934-.141A4.726,4.726,0,0,0,212.95,116.864Zm38.755,7.984a6.386,6.386,0,0,1-1.481-.317,5.263,5.263,0,0,1-3.618-5.6,5.7,5.7,0,0,1,10.116-2.7l-1.371,1.062a3.708,3.708,0,0,0-2.687-1.494,3.7,3.7,0,1,0-.693,7.359,3.663,3.663,0,0,0,2.92-.975l1.147,1.318a5.165,5.165,0,0,1-3.669,1.384Q252.042,124.88,251.7,124.848ZM220.332,114.21l4.323-.333c2.762-.212,4.584,1.065,4.768,3.387.182,2.307-1.417,3.862-4.18,4.075l-2.372.182.239,3.027-1.952.15Zm4.362,1.323-2.281.175.329,4.165,2.282-.175c1.711-.131,2.536-.964,2.433-2.282a1.849,1.849,0,0,0-1.285-1.739,3.3,3.3,0,0,0-1.076-.16Q224.9,115.517,224.694,115.533Zm16.988,8.491.406-10.51,1.956.078-.4,10.51Zm-9.5-10.565,1.957-.017.091,8.865,5.511-.048.017,1.653-7.467.064Z"
              transform="translate(-95.189 -3.236) rotate(-13)"
              fill="#fff"
            />
          </svg>
          <img
            v-if="currentTab == 'foundation'"
            src="/images/Foundation.png"
            class="
              opacity-0
              pie-image
              foundation
              w-[130px]
              lg:w-auto lg:!top-[110px] lg:!left-[102px]
              xl:!top-[120px] xl:!left-[125px]
              3xl:w-[220px] 3xl:!top-[150px] 3xl:!left-[142px]
            "
          />
          <img
            v-if="currentTab == 'financials'"
            src="/images/Financial.png"
            class="
              opacity-0
              pie-image
              financials
              w-[130px]
              lg:w-auto lg:!top-[110px] lg:!left-[102px]
              xl:!top-[120px] xl:!left-[125px]
              3xl:w-[220px] 3xl:!top-[150px] 3xl:!left-[142px]
            "
          />
          <img
            v-if="currentTab == 'business-credit-report'"
            src="/images/Business-Credit-Report.png"
            class="
              opacity-0
              pie-image
              business-credit-report
              w-[130px]
              lg:w-auto lg:!top-[110px] lg:!left-[102px]
              xl:!top-[120px] xl:!left-[125px]
              3xl:w-[220px] 3xl:!top-[150px] 3xl:!left-[142px]
            "
          />
          <img
            v-if="currentTab == 'personal'"
            src="/images/Personal.png"
            class="
              opacity-0
              pie-image
              personal
              w-[130px]
              lg:w-auto lg:!top-[110px] lg:!left-[102px]
              xl:!top-[120px] xl:!left-[125px]
              3xl:w-[220px] 3xl:!top-[150px] 3xl:!left-[142px]
            "
          />
          <img
            v-if="currentTab == 'application-process'"
            src="/images/Application-Process.png"
            class="
              opacity-0
              pie-image
              application-process
              w-[130px]
              lg:w-auto lg:!top-[110px] lg:!left-[102px]
              xl:!top-[120px] xl:!left-[125px]
              3xl:w-[220px] 3xl:!top-[150px] 3xl:!left-[142px]
            "
          />
        </div>
        <div
          class="
            mt-[80px]
            transition-all
            ease-in-out
            duration-100
            relative
            md:w-[250px]
            lg:w-[300px]
            3xl:w-[360px]
            tab-connection
          "
          :style="`height:${sidebarHeight}px`"
          :class="{
            foundation: currentTab == 'foundation',
            financials: currentTab == 'financials',
            'business-credit-report': currentTab == 'business-credit-report',
            personal: currentTab == 'personal',
            'application-process': currentTab == 'application-process',
          }"
        >
          <div
            ref="sidebar"
            :class="`px-2 overflow-y-hidden`"
            :style="`height:${sidebarHeight}px`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32.38"
              height="20.307"
              viewBox="0 0 32.38 20.307"
              class="
                absolute
                left-[-210px]
                sm:left-[-210px]
                md:left-[-208px]
                lg:left-[-195px]
                xl:left-[-290px]
                3xl:left-[-580px]
                top-[-12px]
                z-[-1]
                opacity-0
                triangle-shape
                transition-all
                ease-in-out
                duration-100
              "
            >
              <path
                id="Path_1326"
                data-name="Path 1326"
                d="M-3839,2033.695l32.38,13.538-11.692,6.769h-17.231Z"
                transform="translate(3839 -2033.695)"
                class="transition-all duration-700 ease-in-out"
                :fill="
                  {
                    foundation: '#0CAE87',
                    financials: '#A6C6DC',
                    'business-credit-report': '#E49A17',
                    personal: '#FFD048',
                    'application-process': '#196499',
                  }[currentTab]
                "
              />
            </svg>
            <!-- Begin title icons -->
            <div
              class="
                w-[53px]
                h-[53px]
                absolute
                left-[-75px]
                top-[-26px]
                rounded-full
                shadow-lg
                bg-white
                flex
                items-center
                justify-center
                opacity-0
                title-icons
              "
            >
              <IconFoundation
                v-if="currentTab == 'foundation'"
                class="w-[30px] h-[30px] text-[#0cae87]"
              />
              <IconFinancials
                v-if="currentTab == 'financials'"
                class="w-[30px] h-[30px]"
              />
              <IconBusinessCreditReport
                v-if="currentTab == 'business-credit-report'"
                class="w-[30px] h-[30px]"
              />
              <IconPersonal
                v-if="currentTab == 'personal'"
                class="w-[30px] h-[30px]"
              />
              <IconApplicationProcess
                v-if="currentTab == 'application-process'"
                class="w-[30px] h-[30px]"
              />
            </div>
            <!-- End title icons -->
            <!-- Begin title -->
            <h3
              class="mb-5 text-2xl font-semibold 3xl:text-4xl"
              :class="{
                'text-primary-green': currentTab == 'foundation',
                'text-[#A6C6DC]': currentTab == 'financials',
                'text-[#E49A17]': currentTab == 'business-credit-report',
                'text-[#FFD048]': currentTab == 'personal',
                'text-sunglow-blue': currentTab == 'application-process',
              }"
              v-text="
                {
                  foundation: 'Foundation',
                  financials: 'Financials',
                  'business-credit-report': 'Business Credit Report',
                  personal: 'Personal',
                  'application-process': 'Application Process',
                }[currentTab]
              "
            ></h3>
            <!-- End title -->
            <!-- Begin Foundation Tab -->
            <!-- Begin Foundation loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="currentTab == 'foundation' && !foundationStatuses.length"
            >
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
            </div>
            <!-- End Foundation loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="currentTab == 'foundation' && foundationStatuses.length"
            >
              <base-tab-right-side-bar
                :activeNode="''"
                :nodeLink="''"
                aspectTitle="Foundation"
                :aspectStatuses="foundationNodes"
                :aspectStatusesDb="foundationStatuses"
                ref="tabs"
              ></base-tab-right-side-bar>
            </div>
            <!-- End Foundation Tab -->
            <!-- Begin Financials Tab -->
            <!-- Begin Financials Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="currentTab == 'financials' && !financialsStatuses.length"
            >
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
            </div>
            <!-- End Financials Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="currentTab == 'financials' && financialsStatuses.length"
            >
              <base-tab-right-side-bar
                :activeNode="''"
                :nodeLink="''"
                aspectTitle="Financials"
                :aspectStatuses="financialNodes"
                :aspectStatusesDb="financialsStatuses"
                ref="tabs"
              ></base-tab-right-side-bar>
            </div>
            <!-- End Financials Tab -->
            <!-- Begin business-credit-report Tab -->
            <!-- Begin business-credit-report Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="
                currentTab == 'business-credit-report' &&
                !businessCreditReportStatuses.length
              "
            >
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
            </div>
            <!-- End business-credit-report Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="
                currentTab == 'business-credit-report' &&
                businessCreditReportStatuses.length
              "
            >
              <base-tab-right-side-bar
                :activeNode="''"
                :nodeLink="''"
                aspectTitle="Business Credit Report"
                :aspectStatuses="businessCrReportNodes"
                :aspectStatusesDb="businessCreditReportStatuses"
                ref="tabs"
              ></base-tab-right-side-bar>
            </div>
            <!-- End business-credit-report Tab -->
            <!-- Begin personal Tab -->
            <!-- Begin personal Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="currentTab == 'personal' && !personalStatuses.length"
            >
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
              <BaseBtnLoading />
            </div>
            <!-- End personal Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="currentTab == 'personal' && personalStatuses.length"
            >
              <base-tab-right-side-bar
                :activeNode="''"
                :nodeLink="''"
                aspectTitle="Personal"
                :aspectStatuses="personalNodes"
                :aspectStatusesDb="personalStatuses"
                ref="tabs"
              ></base-tab-right-side-bar>
            </div>
            <!-- End personal Tab -->
            <!-- Begin application-process Tab -->
            <!-- Begin application-process Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="
                currentTab == 'application-process' &&
                !applicationProcessStatuses.length
              "
            >
              <BaseBtnLoading />
            </div>
            <!-- End application-process Loader -->
            <div
              class="flex flex-col gap-2 pb-2 tab-connector"
              v-if="
                currentTab == 'application-process' &&
                applicationProcessStatuses.length
              "
            >
              <base-tab-right-side-bar
                :activeNode="''"
                :nodeLink="''"
                aspectTitle="Application Process"
                :aspectStatuses="appProcessNodes"
                :aspectStatusesDb="applicationProcessStatuses"
                ref="tabs"
              ></base-tab-right-side-bar>
            </div>
            <!-- End application-process Tab -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseBtnLoading from "../components/BaseBtnLoading.vue";
import BaseTabRightSideBar from "../components/BaseTabRightSideBar.vue";
import {
  foundationNodes,
  financialNodes,
  businessCrReportNodes,
  personalNodes,
  appProcessNodes,
} from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Refs
const sidebar = ref(null);
const tabs = ref(null);

// Data
const currentTab = ref("foundation");
const rotateDeg = ref(0);
const sidebarHeight = ref(0);

const foundationStatuses = computed(
  () => store.getters["aspects/getFoundationStatuses"]
);
const financialsStatuses = computed(
  () => store.getters["aspects/getFinancialsStatuses"]
);
const businessCreditReportStatuses = computed(
  () => store.getters["aspects/getBusinessCreditReportStatuses"]
);
const personalStatuses = computed(
  () => store.getters["aspects/getPersonalStatuses"]
);
const applicationProcessStatuses = computed(
  () => store.getters["aspects/getApplicationProcessStatuses"]
);

// Methods
const changeTab = (tab) => {
  currentTab.value = tab;
  router.push(`/fundability/${tab}`);
};

// Hooks
onMounted(() => {
  if (route.params.selected) currentTab.value = route.params.selected;
  sidebarHeight.value =
    sidebar.value.querySelector(".tab-connector").offsetHeight + 47;
  sidebar.value.querySelector(".triangle-shape").classList.add("!opacity-100");

  const pieImage = document.querySelector(`.pie-image.${currentTab.value}`);
  pieImage && pieImage.classList.add("!opacity-100");
  const tabContent = document.querySelector(".tab-connection");
  tabContent && tabContent.classList.add("active");
  const titleIcon = document.querySelector(".title-icons");
  titleIcon.classList.add("active");
});

watch(currentTab, (newTab) => {
  sidebarHeight.value = 0;
  sidebar.value
    .querySelector(".triangle-shape")
    .classList.remove("!opacity-100");
  document.querySelector(".tab-connection").classList.remove("active");
  document.querySelector(".title-icons").classList.remove("active");
  switch (newTab) {
    case "foundation":
      rotateDeg.value = 0;
      break;
    case "application-process":
      rotateDeg.value = 60;
      break;
    case "personal":
      rotateDeg.value = 140;
      break;
    case "business-credit-report":
      rotateDeg.value = 210;
      break;
    case "financials":
      rotateDeg.value = 270;
      break;
  }
  setTimeout(() => {
    const tabConnecter = sidebar.value.querySelector(".tab-connector");
    sidebarHeight.value = tabConnecter && tabConnecter.offsetHeight + 47;
    if (currentTab.value == "business-credit-report") {
      sidebarHeight.value = sidebarHeight.value + 30;
    }
    sidebar.value
      .querySelector(".triangle-shape")
      .classList.add("!opacity-100");
    document
      .querySelector(`.pie-image.${currentTab.value}`)
      .classList.add("!opacity-100");
    document.querySelector(".tab-connection").classList.add("active");
    document.querySelector(".title-icons").classList.add("active");
  }, 1000);
});

watch(route, (newRoute) => {
  if (newRoute.params.selected) {
    currentTab.value = newRoute.params.selected;
  }
});
</script>
