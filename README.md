# strainworks

## Setup (pip / venv)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Setup (conda)

```bash
conda env create -f environment.yml
conda activate strainworks
```

## Run

```bash
python run_web.py --reload
```

You can also run via the installed console script:

```bash
strainworks-web --reload
```
