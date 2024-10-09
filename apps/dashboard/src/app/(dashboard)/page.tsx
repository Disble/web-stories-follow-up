import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CircularProgress,
} from "@repo/ui/nextui";

export default async function Page(): Promise<JSX.Element> {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold text-primary">
        Dashboard de Publicidad Automatizada
      </h1>
      <Card fullWidth shadow="none">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">
              Bienvenido a tu panel de control de publicidad en Facebook
            </p>
            <p className="text-small text-default-500">
              Aquí encontrarás un resumen de tus campañas de novelas ligeras
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card shadow="none">
              <CardBody>
                <CircularProgress
                  classNames={{
                    svg: "w-28 h-28 drop-shadow-md",
                    indicator: "stroke-primary",
                    track: "stroke-default/10",
                    value: "text-2xl font-semibold text-primary",
                  }}
                  value={70}
                  strokeWidth={4}
                  showValueLabel={true}
                />
                <p className="text-center mt-2">Rendimiento de Campañas</p>
              </CardBody>
            </Card>
            <Card shadow="none">
              <CardBody>
                <h2 className="text-2xl font-bold">15</h2>
                <p>Novelas en Promoción</p>
              </CardBody>
            </Card>
            <Card shadow="none">
              <CardBody>
                <h2 className="text-2xl font-bold">5,234</h2>
                <p>Clics en Anuncios</p>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
